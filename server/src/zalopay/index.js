/* eslint-disable no-console */
require('dotenv').config()
const express = require('express')
const axios = require('axios')
const CryptoJS = require('crypto-js')
const { Invoice } = require('../models')

const Router = express.Router()

const config = {
  app_id: process.env.ZALOPAY_APP_ID,
  key1: process.env.ZALOPAY_KEY1,
  key2: process.env.ZALOPAY_KEY2,
  endpoint: 'https://sb-openapi.zalopay.vn/v2/create',
}

const embed_data = {
  redirecturl: `${process.env.REDIRECTURL}/tenant/invoice`,
}

// ================= CREATE ORDER =================
Router.post('/zalopay', async (req, res) => {
  try {
    const { amount, username, transID, description } = req.body

    if (!amount || !username || !transID) {
      return res.status(400).json({ message: 'Thiếu thông tin thanh toán!' })
    }

    const order = {
      app_id: config.app_id,
      app_trans_id: transID,
      app_user: username,
      app_time: Date.now(),
      item: JSON.stringify([]),
      embed_data: JSON.stringify(embed_data),
      amount,
      description: description ?? `Thanh toán đơn hàng #${transID}`,
      bank_code: '',
      callback_url: `${process.env.SERVER_URL}/api/zalopay-callback`,
    }

    const data = [
      config.app_id,
      order.app_trans_id,
      order.app_user,
      order.amount,
      order.app_time,
      order.embed_data,
      order.item,
    ].join('|')

    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString()

    const response = await axios.post(config.endpoint, null, { params: order, timeout: 10000 })
    console.log('ZaloPay create response:', response.data)

    return res.json({ pay_url: response.data.order_url })
  } catch (err) {
    console.error('ZaloPay create error:', err.message)
    return res.status(500).json({ message: 'Lỗi tạo đơn ZaloPay' })
  }
})

// ================= CALLBACK =================
Router.post('/zalopay-callback', express.json(), async (req, res) => {
  try {
    const { data, mac } = req.body

    const macCheck = CryptoJS.HmacSHA256(data, config.key2).toString()

    if (mac !== macCheck) {
      console.error('❌ Invalid MAC')
      return res.json({
        return_code: -1,
        return_message: 'Invalid MAC',
      })
    }

    const parsedData = JSON.parse(data)
    const { app_trans_id, amount, zp_trans_id } = parsedData

    console.log('✅ ZaloPay callback received:', parsedData)

    const invoice = await Invoice.findOne({
      where: { transId: app_trans_id },
    })

    if (!invoice) {
      console.error('❌ Invoice not found:', app_trans_id)
      return res.json({
        return_code: 1,
        return_message: 'Invoice not found',
      })
    }

    if (invoice.status === 'paid') {
      return res.json({
        return_code: 1,
        return_message: 'Already paid',
      })
    }

    if (Number(amount) !== Number(invoice.totalAmount)) {
      console.error('❌ Amount mismatch', {
        amount,
        invoiceAmount: invoice.totalAmount,
      })
      return res.json({
        return_code: -1,
        return_message: 'Amount mismatch',
      })
    }

    await invoice.update({
      status: 'paid',
      paymentMethod: 'zalopay',
    })

    console.log('✅ Invoice marked as PAID:', invoice.invoiceId)

    return res.json({
      return_code: 1,
      return_message: 'success',
    })
  } catch (err) {
    console.error('❌ Callback error:', err)
    return res.json({
      return_code: 0,
      return_message: err.message,
    })
  }
})

module.exports = Router
