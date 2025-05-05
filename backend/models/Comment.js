module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.User, { foreignKey: 'userId' });
    Comment.belongsTo(models.Song, { foreignKey: 'songId' });
  };

  return Comment;
};
