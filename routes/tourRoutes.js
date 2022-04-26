const express = require('express');
const { createReview } = require('../controller/reviewController');
const tourController = require('../controller/tourController')
const authController = require('./../controller/authController')
const router = express.Router();
const reviewRouter = require('./../routes/reviewRouter');


router.use('/:tourId/reviews', reviewRouter)

router
    .route('/top-5-cheap')
    .get(tourController.getCheapTour, tourController.getAllTour)

router
    .route('/get-tour-state')
    .get(tourController.getTourState);

router
    .route('/get-plan/:year')
    .get(authController.restrictTo('admin', 'lead-guide', 'guide'), tourController.getMontlyPlan);

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getTourWithin);

router
    .route('/tours-distances/:latlng/unit/:unit')
    .get(tourController.getDistances)

router
    .route('/')
    .get(tourController.getAllTour)
    .post(
        authController.protect,
        authController.restrictTo('admin', 'lead-guide', 'guide'),
        tourController.createTour
    )

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        tourController.uploadPhoto,
        tourController.resizePhoto,
        tourController.updateTour
    )
    .delete(
        authController.protect,
        authController.restrictTo("admin"),
        tourController.deleteTour
    )



module.exports = router
