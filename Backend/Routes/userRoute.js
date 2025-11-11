const express = require('express')
const router = express.Router()
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
  User.getAllUsers((err, data) => {
    if (err) return res.status(500).json(err)
    res.json(data)
  })
})

router.get('/:id', (req, res) => {
  User.getUserById(req.params.id, (err, data) => {
    if (err) return res.status(500).json(err)

    if (data.length === 0) 
      return res.status(404).json({ message: 'User not found' })

    const token = jwt.sign({ id: req.params.id }, process.env.JWT_SECRET || 'secretkey', { expiresIn: '5m' })
    res.json({ message: 'success', data, access_token: token })
  })
})

router.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields are required' })

  const newUser = { name, email, password }
  User.createUser(newUser, (err, result) => {
    if (err) return res.json(err)
    res.status(201).json({ message: 'User registered', userId: result.insertId })
  })
})

router.get('/read', (req, res) => {
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

module.exports = router