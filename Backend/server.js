const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({ origin: true, credentials: true }))
app.use(cookieParser())

const User = require('./Models/UserModel')

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.post('/register', (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  User.createUser({ name, email, password }, (err, data) => {
    if (err) {
      console.error('Error creating user:', err)
      return res.status(500).json({ message: 'Database error', error: err })
    }
    res.status(201).json({ message: 'User registered successfully' })
  })
})

app.post('/authorize', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  User.getUserByCredentials(email, password, (err, user) => {
    if (err) {
      console.error('Login error:', err)
      return res.status(500).json({ message: 'Database error', error: err })
    }

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '1h' })
    res.cookie('Token', token, { httpOnly: true, secure: false, sameSite: 'lax' })

    res.status(200).json({
      message: 'success',
      user: user,
      access_token: token
    })
  })
})

app.get('/read', (req, res) => {
  try {
    const token = req.cookies.Token
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey')
    res.json({ message: 'Token verified', decoded })
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})