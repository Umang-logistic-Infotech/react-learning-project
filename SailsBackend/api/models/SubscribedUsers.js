require('dotenv').config();

module.exports = {
  tableName: 'subscribedusers',
  
  attributes: {
    userId: {
      type: 'number',
      required: true,
      unique: true,
      columnName: 'userId'
    },
    
    user: {
      model: 'user',
      columnName: 'userId'
    },
    
    subscribedAt: {
      type: 'ref',
      columnType: 'datetime'
    },
    
    validTill: {
      type: 'ref',
      columnType: 'datetime'
    }
  },

  beforeCreate: async function(values, proceed) {
    try {
      const userExists = await User.findOne({ id: values.userId });
      
      if (!userExists) {
        return proceed(new Error(`User with id ${values.userId} does not exist`));
      }
      
      return proceed();
    } catch (error) {
      return proceed(error);
    }
  }
};