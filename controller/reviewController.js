// const catchAsync = require('../utils/catchAsync');
const Review = require('./../modals/reviewModal');
const {
    deleteOne,
    updateOne,
    createOne,
    getOne,
    getAll
} = require('./factoryHandler');

exports.setTourUserId =(req, res, next) => {
    // allow nested routes

    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;

    next();
}

exports.getAllReview = getAll(Review);
exports.getReview = getOne(Review);
exports.createReview = createOne(Review)
exports.deleteReview = deleteOne(Review);
exports.updateReview = updateOne(Review);