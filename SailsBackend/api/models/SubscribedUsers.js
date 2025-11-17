const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../services/sequelize');  

const SubscribedUser = sequelize.define('subscribedusers', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    unique: true,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  subscribedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  validTill: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  timestamps: false,
});

SubscribedUser.getUserSubscription = async (userId) => {
  try {
    return await SubscribedUser.findOne({
      where: {
        userId: userId,
        validTill: {
          [Sequelize.Op.gt]: new Date(),
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

SubscribedUser.createSubscription = async (userId, validTill) => {
  try {
    return await SubscribedUser.create({
      userId,
      validTill
    });
  } catch (error) {
    throw error;
  }
};

module.exports = SubscribedUser;
