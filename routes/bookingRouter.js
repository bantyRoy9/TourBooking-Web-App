const express = require('express');
const authController = require('../controller/authController');
const { getCheckoutSession, getAllBooking, getBooking, updateBooking, deleteBooking, creatingBooking } = require('../controller/bookingController');

const router = express.Router();

router.use(authController.protect)

router.get('/checkout-session/:tourId', getCheckoutSession);

router.use(authController.restrictTo('admin','lead-guide'))

router.route('/').get(getAllBooking).post(creatingBooking);

router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router