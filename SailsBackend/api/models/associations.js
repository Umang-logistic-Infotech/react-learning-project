const User = require('./User');
const SubscribedUsers = require('./SubscribedUsers');

User.hasOne(SubscribedUsers, {
  foreignKey: 'userId',
  as: 'subscription'
});

SubscribedUsers.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

module.exports = { User, SubscribedUsers };