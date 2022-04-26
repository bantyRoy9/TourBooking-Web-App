const express = require('express')
const { protect, restrictTo } = require('../controller/authController')
const { getAllReview, createReview, deleteReview, setTourUserId, updateReview, getReview } = require('../controller/reviewController');

const router = express.Router({ mergeParams: true })

router.use(protect)

router
    .route('/')
    .get(getAllReview)
    .post(restrictTo('user'), setTourUserId, createReview);

router
    .route('/:id')
    .get(getReview)
    .patch(restrictTo('user', 'admin'),updateReview)
    .delete(restrictTo('user', 'admin'),deleteReview)

module.exports = router
