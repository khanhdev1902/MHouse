const DashboardService = require('../services/dashboard.service')
const getDashboardData = async (req, res) => {
  try {
    const dashboardData = await DashboardService.getDashboardData()
    res.status(200).json(dashboardData)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = {
  getDashboardData,
}
