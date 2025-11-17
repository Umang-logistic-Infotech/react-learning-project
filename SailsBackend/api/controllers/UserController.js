const User = require('../models/User');  
const jwt = require('jsonwebtoken'); 

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.getAllUsers();
      if (users.length === 0) {
        return res.status(404).json({ message: 'No users found' });
      }
      return res.json(users);
    } catch (error) {
      return res.serverError(error);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },

  createUser: async (req, res) => {
    const { email } = req.body;
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      const newUser = await User.create(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.serverError(error);
    }
  },


  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (error) {
      return res.serverError(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.deleteUser(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(deletedUser);
    } catch (error) {
      return res.serverError(error);
    }
  },

  authorize: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    try {
      const user = await User.getUserByCredentials(email, password);
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('Token', token);

      return res.status(200).json({
        message: 'Success',
        user,
        access_token: token,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
  }
};
