const sequelize = require('../config/connection');
const seedMyComment = require('./comment');
const seedMyPosts = require('./postData');
const seedUsers = require('./userData');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  
  await seedUsers();
  
  await seedMyPosts();

  await seedMyComment();

  process.exit(0);
};

seedAll();