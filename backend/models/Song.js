const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Song = sequelize.define('Song', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: DataTypes.STRING,
  album: DataTypes.STRING
});

module.exports = Song;
