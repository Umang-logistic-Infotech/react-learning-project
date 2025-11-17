const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  tableName: 'users',
  
  attributes: {
    name: {
      type: 'string',
      required: true
    },
    
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true
    },
    
    password: {
      type: 'string',
      required: true
    },
    
    subscription: {
      collection: 'subscribedusers',
      via: 'user'
    }
  },

  beforeCreate: async function(values, proceed) {
    try {
      const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS || 10);
      const salt = await bcrypt.genSalt(saltRounds);
      values.password = await bcrypt.hash(values.password, salt);
      return proceed();
    } catch (error) {
      return proceed(error);
    }
  },

User.beforeCreate(async (user) => {
  const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS || 10);
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS || 10);
    const salt = await bcrypt.genSalt(saltRounds);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

User.prototype.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

User.getUserByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;
    
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return {
        id: user.id,
        email: user.email,
        name: user.name
      };
    }
  },

  customToJSON: function() {
    return {
      id: this.id,
      name: this.name,
      email: this.email
    };
  },

  comparePassword: async function(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
};