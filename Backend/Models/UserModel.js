const db = require('../db')
const bcrypt = require('bcrypt')
require('dotenv').config()

const UserModel = {
  getAllUsers: callback => {
    db.query('SELECT * FROM users', callback)
  },

  getUserById: (id, callback) => {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback)
  },

  createUser: async (user, callback) => {
    const { name, email, password } = user
    try {
      const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS, 10) || 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        callback
      )
    } catch (err) {
      callback(err)
    }
  },

  getUserByCredentials: (email, password, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return callback(err)
      if (results.length === 0) return callback(null, null)
      const user = results[0]
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return callback(err)
        if (result) return callback(null, user)
        return callback(null, null)
      })
    })
  },

  updateUser: async (id, user, callback) => {
    const { name, email, password } = user
    try {
      const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS, 10) || 10
      const salt = await bcrypt.genSalt(saltRounds)
      const hashedPassword = await bcrypt.hash(password, salt)
      db.query(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, hashedPassword, id],
        callback
      )
    } catch (err) {
      callback(err)
    }
  },

  deleteUser: (id, callback) => {
    db.query('DELETE FROM users WHERE id = ?', [id], callback)
  }
}

module.exports = UserModel