const router = require('express').Router()
const DashboardController = require('../controllers/dashboard.controller')

router.get('/', DashboardController.getDashboardData)

module.exports = router
