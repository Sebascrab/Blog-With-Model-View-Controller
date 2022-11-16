
// declaring routes for api's:
const router = require('express').Router();
const postRoutes = require('./postRoutes');
// const userRoutes = require('./userRoutes');
const commentRoutes = require('./postRoutes');


// routers to other files:
// router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);

module.exports = router;