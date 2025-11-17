const SubscribedUser = require('../models/SubscribedUsers');
const jwt = require('jsonwebtoken'); 

module.exports = {
  subscribeUser: async (req, res) => {
    try {
      const {  validTill , token } = req.body;
      const tokenData = jwt.verify(token,process.env.JWT_SECRET);
      const userId = tokenData.id;
      const existingSubscription = await SubscribedUser.getUserSubscription(userId);
      if (existingSubscription) {
        return res.status(400).json({
          message: 'User is already subscribed',
        });
      }

      const subscription = await SubscribedUser.createSubscription(userId, validTill);

      return res.status(200).json({
        message: 'User subscribed successfully',
        subscription
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Error subscribing user',
        error: error.message
      });
    }
  },

  checkUserSubscription: async (req, res) => {
    try {
      const { token } = req.body;
      
      const tokenData = jwt.verify(token,process.env.JWT_SECRET);
      const userId = tokenData.id;

      const subscription = await SubscribedUser.getUserSubscription(userId);
      console.log(subscription);

      if (subscription) {
        return res.status(200).json({
          valid: true,
          subscription
        });
      } else {
        return res.status(200).json({
          valid: false,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error checking user subscription',
        error: error.message
      });
    }
  },

  isSubscribed: async (req, res) => {
    try {
      const { token } = req.body;
      
      const tokenData = jwt.verify(token,process.env.JWT_SECRET);
      const userId = tokenData.id;

      const subscription = await SubscribedUser.getUserSubscription(userId);

      if (subscription) {
        return res.status(200).json({
          valid: true,
        });
      } else {
        return res.status(200).json({
          valid: false,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'Error checking user subscription',
        error: error.message
      });
    }
  },
};