const { User } = require('../models')

const login = async (userName, password) => {
  const user = await User.findOne({
    where: {
      userName: userName,
    },
  })

  if (!user) return null

  if (user.passwordHash !== password) return null

  const { passwordHash, ...safeUser } = user.toJSON()
  return safeUser
}

module.exports = {
  login,
}
