const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const Review = require('./../modals/reviewModal')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
        maxlength: [40, 'A tour name must less than 10'],
        minlength: [5, 'A tour name must greater than 5'],
        // validate: [validator.isAlpha, 'Tour name must be content charecter only']

    },
    slug: String,
    duration: {
        type: Number,
        required: [true, 'A tour must have duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have max grouping']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have difficulty size'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'difficulty is either : easy, middium, and difficult'
        }
    },
    category:{
        type:String
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        set : val => Math.round( val * 10 )/ 10 //4.666*10=46.66 => 47=>47/10=4.7

    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have price']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price;
            },
            message: ' priceDiscount should be less than price'
        }
    },
    rating: {
        type: Number,
        default: 4.6,
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have summery']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A true must have a cover Img']
    },
    images: [String],
    createAt: {
        type: Date,
        default: Date.now()
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false

    },
    startLocation: {
        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String
    },
    locations: [{

        type: {
            type: String,
            default: 'Point',
            enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
    }],
    guides: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    ]
    // reviews:[{
    //     type: mongoose.Schema.ObjectId,
    //     ref:'Review'
    // }]

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


// indexes its help to improve fast serching the doc in collection by sorted

tourSchema.index({ price : 1, ratingsAverage: -1});
tourSchema.index({ startLocation : '2dsphere'})

tourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
});

tourSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'tour'
})

tourSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'guides',
        select: '-__v'
    })
    next();
})
// DOCUMENT MIDDLEWARE : run before .save and .create 
// pre save middleware/hooks
tourSchema.pre('save', function (next) {
     this.slug = slugify(this.name, {lower : true})
    next();
});
// post save middleware/hooks
// tourSchema.post('save', function (doc, next) {
    //  console.log(doc);
    // next();
// })
// query middleware
// ^ it means that match all query started with find
tourSchema.pre(/^find/, function (next) {
    this.find({ secretTour: { $ne: true } })
    this.createdate = Date.now();
    next();
})


// calculate how many time to take to execute code 
// tourSchema.post(/^find/, function(docs,next){ 
//     console.log(Date.now()-this.createdate);
//     next();
// })

// aggregte middleware

// tourSchema.pre('aggregate', function (next) {
//     console.log(this.pipeline())
//     this.pipeline().unshift({ $match: { secretTour: { $ne: true } } })
//     next();
// })



const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
