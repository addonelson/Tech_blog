const router = require('express').Router();

const userRouter = require('./user-routes');

const blogRoutes = require('./blog-routes.js');

router.use('/users', userRouter);

router.use('/posts', blogRoutes);

module.exports = router;