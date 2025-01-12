const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth');
const serviceRoutes = require('./services');
const bookingRoutes = require('./bookings');
const userRoutes = require('./users');
const chatRoutes = require('./chat');

// Auth routes
router.use('/auth', authRoutes);

// Service routes
router.use('/services', serviceRoutes);

// Booking routes
router.use('/bookings', bookingRoutes);

// User routes
router.use('/users', userRoutes);

// Chat routes
router.use('/chat', chatRoutes);

module.exports = router;
