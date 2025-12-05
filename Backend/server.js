const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

const User = require('./Models/UserModel');

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await User.create({ name, email, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.post('/authorize', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await User.getUserByCredentials(email, password);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('Token123',"tenodjksndsadywsgduysa");
    res.cookie('Token', token, { httpOnly: true, secure: false, sameSite: 'lax' });

    res.status(200).json({
      message: 'Success',
      user: user,
      access_token: token,
    });
  } catch (err) {
    res.status(500).json({ message: 'Database error', error: err.message });
  }
});

app.get('/read', (req, res) => {
  try {
    const token = req.cookies.Token;

    if (!token) {

      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({ message: 'Token verified', decoded });
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
