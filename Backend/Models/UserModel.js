const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = sequelize.define('users', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

User.beforeCreate(async (user) => {
  const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS);
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

User.getUserByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await user.comparePassword(password);
    if (isMatch){
      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    };
    return null;
  } catch (error) {
    throw error;
  }
};

User.getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

User.getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw error;
  }
};

User.updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;

    return await user.update(userData);
  } catch (error) {
    throw error;
  }
};

User.deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = User;
