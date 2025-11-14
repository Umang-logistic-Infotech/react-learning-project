const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
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
      const user = await User.findOne({ id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json(user);
    } catch (error) {
      return res.serverError(error);
    }
  },

  createUser: async (req, res) => {
    const { email, name, password } = req.body;
    
    if (!email || !name || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    try {
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      
      const newUser = await User.create(req.body).fetch();
      
      return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      });
    } catch (error) {
      return res.serverError(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const updateData = {};

      if (name) updateData.name = name;
      if (email) updateData.email = email;
      if (password) updateData.password = password;

      const updatedUser = await User.updateOne({ id: req.params.id })
        .set(updateData);

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.json({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email
      });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.serverError(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.destroyOne({ id: req.params.id });
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
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.cookie('Token123', "tenodjksndsadywsgduysa");
      res.cookie('Token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return res.status(200).json({
        message: 'Success',
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        },
        access_token: token,
      });
    } catch (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
  }
};