const sequelize = require('../config/connection');
const seedMyPosts = require('./postData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();
  
  await seedMyPosts();

  process.exit(0);
};

seedAll();