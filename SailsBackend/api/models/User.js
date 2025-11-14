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

  beforeUpdate: async function(values, proceed) {
    try {
      if (values.password) {
        const saltRounds = parseInt(process.env.DB_PASSWORD_SALTROUNDS || 10);
        const salt = await bcrypt.genSalt(saltRounds);
        values.password = await bcrypt.hash(values.password, salt);
      }
      return proceed();
    } catch (error) {
      return proceed(error);
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