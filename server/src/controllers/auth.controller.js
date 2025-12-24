// src/controllers/auth.controller.js
const authService = require('../services/auth.service')

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      message: 'Username và password là bắt buộc',
    })
  }

  const user = await authService.login(username, password)

  if (!user) {
    return res.status(401).json({
      message: 'Sai username hoặc password',
    })
  }

  return res.json({
    message: 'Đăng nhập thành công',
    user,
  })
}

module.exports = {
  login,
}
