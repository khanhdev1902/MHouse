const { User } = require('../models')

const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ['passwordHash'] },
  })
}

const getUserById = async (id) => {
  return await User.findByPk(id, {
    attributes: { exclude: ['passwordHash'] },
  })
}

const createUser = async (data) => {
  // basic validate
  if (!data.userName || !data.passwordHash) {
    throw new Error('Username and password are required')
  }

  return await User.create(data)
}

const updateUser = async (id, data) => {
  const user = await User.findByPk(id)
  if (!user) return null

  await user.update(data)
  return user
}

const deleteUser = async (id) => {
  const user = await User.findByPk(id)
  if (!user) return false

  await user.destroy()
  return true
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
