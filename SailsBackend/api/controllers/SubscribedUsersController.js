module.exports = {
  
  getAllSubscriptions: async (req, res) => {
    try {
      const subscriptions = await SubscribedUsers.find().populate('user');
      if (subscriptions.length === 0) {
        return res.status(404).json({ message: 'No subscriptions found' });
      }
      return res.json(subscriptions);
    } catch (error) {
      return res.serverError(error);
    }
  },

  getSubscriptionById: async (req, res) => {
    try {
      const subscription = await SubscribedUsers.findOne({ id: req.params.id })
        .populate('user');

      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      return res.json(subscription);
    } catch (error) {
      return res.serverError(error);
    }
  },

  getSubscriptionByUserId: async (req, res) => {
    try {
      const subscription = await SubscribedUsers.findOne({ userId: req.params.userId })
        .populate('user');

      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found for this user' });
      }

      return res.json(subscription);
    } catch (error) {
      return res.serverError(error);
    }
  },

  createSubscription: async (req, res) => {
    const { userId, subscribedAt, validTill } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'userId is required' });
    }

    try {
      const subscription = await SubscribedUsers.create({
        userId: userId,
        subscribedAt: subscribedAt || new Date(),
        validTill: validTill
      }).fetch();

      return res.status(201).json(subscription);
    } catch (error) {
      if (error.message.includes('does not exist')) {
        return res.status(404).json({ message: error.message });
      }
      if (error.code === 'E_UNIQUE') {
        return res.status(400).json({ message: 'User already has a subscription' });
      }
      return res.serverError(error);
    }
  },

  updateSubscription: async (req, res) => {
    try {
      const { subscribedAt, validTill } = req.body;
      const updateData = {};

      if (subscribedAt) updateData.subscribedAt = subscribedAt;
      if (validTill) updateData.validTill = validTill;

      const updatedSubscription = await SubscribedUsers.updateOne({ id: req.params.id })
        .set(updateData);

      if (!updatedSubscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      return res.json(updatedSubscription);
    } catch (error) {
      return res.serverError(error);
    }
  },

  deleteSubscription: async (req, res) => {
    try {
      const subscription = await SubscribedUsers.destroyOne({ id: req.params.id });

      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }

      return res.json(subscription);
    } catch (error) {
      return res.serverError(error);
    }
  },

  deleteSubscriptionByUserId: async (req, res) => {
    try {
      const subscription = await SubscribedUsers.destroyOne({ userId: req.params.userId });

      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found for this user' });
      }

      return res.json(subscription);
    } catch (error) {
      return res.serverError(error);
    }
  }
};