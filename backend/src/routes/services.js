const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Public routes
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getService);
router.get('/category/:category', serviceController.getServicesByCategory);

// Protected routes - require authentication
router.use(auth);

// Provider/Admin only routes
router.post('/', upload.array('images', 5), serviceController.createService);
router.put('/:id', upload.array('images', 5), serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

// Promotion routes
router.post('/:id/promotions', serviceController.addPromotion);
router.delete('/:id/promotions/:promotionId', serviceController.removePromotion);

// Availability routes
router.post('/:id/availability', serviceController.updateAvailability);
router.get('/:id/availability', serviceController.getAvailability);

module.exports = router;
