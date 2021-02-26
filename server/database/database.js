const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  dialect: 'postgres',
  host: 'localhost',
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;
