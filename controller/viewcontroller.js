const Booking = require("../modals/bookingModal");
const Tour = require("../modals/tourModals");
const User = require('./../modals/userModal');
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.alerts = (req, res, next) => {
    const { alert } = req.query;
    if (alert === 'booking')
      res.locals.alert =
        "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
    next();
  };
exports.getOverview= catchAsync(async (req,res,next)=>{

    const tours = await Tour.find();

    res.status(200).render('overview',{
        title:'All Tour',
        tours
    });
})
exports.getTourview=catchAsync(async(req,res,next)=>{
   
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path:'reviews',
        fields:'review rating user'
    });

    if(!tour) return next(new AppError("Url doesn't exist!!",404));
   
    res.status(200).render('tour',{
        title:`${tour.name} Tour`,
        tour
    });
})
exports.signup=(req,res,next)=>{
    res.status(200).render('signup',{
        title:"SignUp your Account"
    })
}
exports.login = (req,res,next) =>{

    res.status(200).render('login',{
        title:'login your acc'
    })
}

exports.getAccount = (req,res) => {
    res.status(200).render('account',{
        title:'Your Account'
    })
}

exports.getMyTours = catchAsync(async(req,res,next)=>{

    const bookings = await Booking.find({ user : req.user.id})

    const tourId = bookings.map(el => el.tour)

    const tours = await Tour.find({ _id: { $in : tourId }})

    res.status(200).render('overview',{
        title:"MY TOURS",
        tours
    })
});
exports.updateUserData = catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id,{
        name: req.body.name,
        email: req.body.email
      },
      {
        new: true,
        runValidators: true
      }
    );
  
    res.status(200).render('account', {
      title: 'Your account',
      user: updatedUser
    });
  });
  