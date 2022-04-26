const sanitize = require('express-mongo-sanitize')
const applimit = require('express-rate-limit');
const cookieparser = require('cookie-parser');
const express = require('express');
const helmets = require('helmet');
const xss = require('xss-clean');
const path = require('path');
const hpp = require('hpp');
const cors = require('cors')

const globleErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(helmets())
const limiter = applimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'to many Api Request!! Please Login again'
})
app.use('/api', limiter);
app.use(express.json({ limit: '14kb' }));
app.use(express.urlencoded({ extended: true, limit: '14kb' }));
app.use(cookieparser());
app.use(sanitize());
app.use(xss());
app.use(
    hpp({
        whitelist: [
            'duration',
            'ratingsQuantity',
            'ratingsAverage',
            'maxGroupSize',
            'difficulty',
            'price'
        ]
    })
)

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const bookingRouter = require('./routes/bookingRouter');

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't found ${req.originalUrl} on this server`, 404));
})

app.use(globleErrorHandler)


module.exports = app