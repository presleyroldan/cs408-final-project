const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Song = require('./Song')(sequelize, DataTypes);

User.belongsToMany(User, {
  as: 'Friends',           // This user's friens
  through: 'UserFriends',
  foreignKey: 'userId',
  otherKey: 'friendId'
});

User.belongsToMany(User, {
  as: 'FriendOf',          // People who added this user as a friend 
  through: 'UserFriends',  // These need to be different or weird stuff happens
  foreignKey: 'friendId',
  otherKey: 'userId'
});


User.belongsToMany(Song, {
  through: 'Tracklist',
  foreignKey: 'userId'
});

Song.belongsToMany(User, {
  through: 'Tracklist',
  foreignKey: 'songId'
});

module.exports = { sequelize, User, Song };
