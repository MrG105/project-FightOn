const router = require('express').Router();
const userRoutes = require('./userRoutes');
const gameRoutes = require('./gameRoutes');
const profileRoutes = require('./profileRoutes');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/profile', profileRoutes);

module.exports = router;
