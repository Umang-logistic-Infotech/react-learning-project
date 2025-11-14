// api/services/sequelize.js
const { Sequelize } = require('sequelize');
require('dotenv').config();  // If you're using environment variables for DB credentials

// Set up the Sequelize instance with connection details
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST ,    // Make sure to configure this properly
  username: process.env.DB_USER ,     // Your DB username
  password: process.env.DB_PASSWORD ,     // Your DB password
  database: process.env.DB_NAME ,  // Your DB name
  logging: console.log,
});

sequelize.authenticate()
  .then(() => console.log('Sequelize connected to the database'))
  .catch(err => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
