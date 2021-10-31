const { User } = require('../models')

const userData = [
    {
        username: "username1",
        password: "password1"
    },
    {
        username: "aaron1234",
        password: "aaron1234"
    }
];

const seedUsers = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUsers;