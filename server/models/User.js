const db = require('./../database/database');
const Sequelize = require('sequelize');
const Profile = require('./Profile');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

User.hasMany(Profile, { as: 'Profiles' });
Profile.belongsTo(User);

module.exports = User;
