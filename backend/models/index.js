const sequelize = require('../config');
const { DataTypes } = require('sequelize');

const User = require('./User')(sequelize, DataTypes);
const Song = require('./Song')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);

// Many-to-many: Users <-> Songs (Tracklist)
User.belongsToMany(Song, {
  through: 'Tracklist',
  foreignKey: 'userId',
  otherKey: 'songId'
});

Song.belongsToMany(User, {
  through: 'Tracklist',
  foreignKey: 'songId',
  otherKey: 'userId'
});

// Many-to-many: Users <-> Users (Friends)
User.belongsToMany(User, {
  as: 'Friends',
  through: 'UserFriends',
  foreignKey: 'userId',
  otherKey: 'friendId'
});

User.belongsToMany(User, {
  as: 'FriendOf',
  through: 'UserFriends',
  foreignKey: 'friendId',
  otherKey: 'userId'
});

module.exports = { sequelize, User, Song, Comment };
