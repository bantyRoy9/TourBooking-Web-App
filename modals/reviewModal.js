const mongoose = require('mongoose');
const Tour = require('./tourModals')

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review should not empty!']
    },
    rating: {
        type: Number,
        max: 5,
        min: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    tour:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Tour',
        required: [true, 'Review must belong a tour']
    },
    user:
    {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong a tour']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    });

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });


reviewSchema.pre(/^find/, function (next) {
    // this.populate({
    //     path:'tour',
    //     select:'name'
    // }).populate({
    //     path:'user',
    //     select:'name'
    // })
    //  next();
    this.populate({
        path: 'user',
        select: 'name photo'
    })
    next();
});

reviewSchema.statics.calcRatingAvg = async function (tourId) {
    const stats = await this.aggregate([
        {
            $match: { tour: tourId }
        },
        {
            $group: {
                _id: '$tour',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }

        }
    ])
    console.log(stats);

    if(stats.length >0){

        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: stats[0].nRating,
            ratingsAverage: stats[0].avgRating
        });
    }else{
        await Tour.findByIdAndUpdate(tourId, {
            ratingsQuantity: 0,
            ratingsAverage: 4.5
          });

    }
};

reviewSchema.post('save', function () {
    this.constructor.calcRatingAvg(this.tour)
})


reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.review = await this.findOne().clone();
    next();
})

reviewSchema.post(/^findOneAnd/, async function () {
    await this.review.constructor.calcRatingAvg(this.review.tour);
});




const Review = mongoose.model('Review', reviewSchema);

module.exports = Review