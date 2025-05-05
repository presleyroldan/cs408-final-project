module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING
  });

  return User;
};
