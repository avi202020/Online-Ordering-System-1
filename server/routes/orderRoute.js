const express = require('express');
const router = express.Router();
const { placeorder, getordersByUserID } =require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');


router.route('/').post(protect, placeorder)
router.route('/').get(protect, getordersByUserID)

module.exports = router;