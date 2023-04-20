require('dotenv').config();

module.exports = {
  url: `mongodb://${process.env.DB_HOST}/${process.env.DB_DATABASE}`, // Replace 'Mymongodb' with the name of your database
};