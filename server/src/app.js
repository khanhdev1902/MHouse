const express = require('express')
const cors = require('cors')
const { connectDB } = require('./config/database')
const userRoutes = require('./routes/user.route')
const roomRoutes = require('./routes/room.route')
const serviceRoutes = require('./routes/service.route')
const amenityRoutes = require('./routes/amenity.route')
const invoiceRoutes = require('./routes/invoice.route')
const paymentRoute = require('./routes/payment.route')
const chatRoute = require('./routes/chat.route')
const contractRoute = require('./routes/contract.route')
const invoiceDetailRoute = require('./routes/invoiceDetail.route')
const dashboardRoute = require('./routes/dashboard.route')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/amenities', amenityRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/payments', paymentRoute)
app.use('/api/chats', chatRoute)
app.use('/api/contracts', contractRoute)
app.use('/api/invoice-details', invoiceDetailRoute)
app.use('/api/dashboard', dashboardRoute)

app.get('/', (req, res) => {
  res.send('MHouse API running')
})

const PORT = process.env.PORT || 3000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
})
