import express from 'express';
import userRoutes from './resources/user/user.route';
import authRoutes from './resources/auth/auth.route';
import restaurantRoutes from './resources/restaurant/restaurant.route';
import reviewRoutes from './resources/review/review.route';

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/reviews', reviewRoutes);

export default router;
