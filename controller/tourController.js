// const fs = require('fs')
const multer = require('multer');
const sharp = require('sharp')
const Tour = require('../modals/tourModals');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { deleteOne, updateOne, getOne, createOne, getAll } = require('./factoryHandler');




// middleware for getting specific condition
exports.getCheapTour = (req,res,next)=>{
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,duration,-_id'

    next();
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    // if(file.mimetype.startsWith('image')){
    if(file.mimetype.startsWith('image')){

        cb(null,true )
    }else{
        cb(new AppError('Not an Image!, provide Image only',400))
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})
exports.uploadPhoto = upload.fields([
    {name: 'imageCover', maxCount: 1},
    {name: 'images', maxCount: 3}
]);

exports.resizePhoto = catchAsync(async(req,res,next)=>{
    if(!req.files.imageCover || !req.files.images) return next();
// cover img
    // console.log(req.files.imageCover);
    req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`

    await sharp(
        req.files.imageCover[0].buffer)
        .resize(2000,1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90})
        .toFile(`public/img/tours/${req.body.imageCover}`)

// images
    req.body.images = [];

    await Promise.all(
        req.files.images.map(async(file,i)=>{
        const filename = `tour-${req.params.id}-${Date.now()}-${i+1}.jpeg`;

        await sharp(file.buffer)
        .resize(2000,1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90})
        .toFile(`public/img/tours/${filename}`);

        req.body.images.push(filename);
    })
    );
    next();
});


exports.getTourWithin = catchAsync(async(req,res,next)=>{
    const { distance, latlng, unit } = req.params;
    const [ lat, lng ] = latlng.split(',')

    const radius = unit === 'mi' ? distance / 3963.2 : distance/ 6378.1

    if(!lat || !lng ){
        next(new AppError('Provide valid longitude and langitude',400))
    }


    const tours = await Tour.find({ startLocation : { $geoWithin : { $centerSphere: [[lng, lat], radius]}}})

    res.status(200).json({
        status:'success',
        results: tours.length,
        data:{
            data:tours
        }
    });
});


exports.getDistances = catchAsync(async(req,res,next)=>{
    const {  latlng , unit } = req.params;
    const [ lat, lng ] = latlng.split(',')

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;


    const distances = await Tour.aggregate([
        {
            $geoNear:{
                near:{
                    type:'Point',
                    coordinates: [ lng *1 , lat *1]
                },
                distanceField:'distance',
                distanceMultiplier:multiplier,
            }
        },
            {
                $project:{
                    distance:1,
                    name:1
                }
            }
    ])
    res.status(200).json({
        status: 'success',
        data: {
          data: distances
        }
      });
})


exports.getTourState = catchAsync(async (req, res,next)=>{
    const state = await Tour.aggregate([
      {
        $match: { ratingsAverage : { $gte : 4.5 } }
     },
    {
        $group:{ 
            // _id: '$ratingsAverage',
            _id: '$difficulty',
            NumTour: { $sum : 1},
            NumRating: { $sum :'$ratingsQuantity'},
            avgRating: { $avg :'$ratingsAverage'},
            avgPrice: { $avg : '$price'},
            minPrice: { $min : '$price'},
            maxPrice: { $max : '$price'},
        }
    },
    {
        $sort:{ avgRating : 1}
    }
    ]);
    if(!state){
        return next(new AppError('No Tour found with this ID', 404))
    }
    res.status(200).json({
        status:'success',
        data:{
           state
        }
    })
})

exports.getMontlyPlan = catchAsync(async (req, res,next)=>{
    const months = ['jan','feb','mar','apr','may','jun','jly','aug','sep','oct','nov','dec'];
        const year = req.params.year * 1;
        // console.log(year);

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`)
                      
                    }
                }
            },
            {
                $group:{ 
                    _id: { $month: '$startDates'},
                    numTourStart: { $sum : 1 },
                    tours : { $push: '$name'}
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project:{ _id : 0}
            },
            {
                $sort:{ numTourStart : 1}
            }
        ])

        if(!plan){
            return next(new AppError('No Tour found with this ID', 404))
        }
        res.status(200).json({
            status:'success',
            data:{
               plan
            }})
})
exports.getAllTour = getAll(Tour)

exports.createTour = createOne(Tour);

exports.getTour = getOne( Tour, {path:'reviews'})

exports.deleteTour = deleteOne(Tour);

exports.updateTour = updateOne(Tour)

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)
// );

// exports.checkId =(req,res,next,val)=>{
//     console.log(val);
//     if(req.params.id*1 > tours.length){
//         return res.status(404).json({
//              status:'fail',
//              message:'invalid user'
//          })
//      }
//      next();
// }

// exports.checkBody =(req,res,next)=>{
//     if(!req.body.name || !req.body.price){
//         return res.status(404).json({
//             status:'fail',
//             message:'bad cridential'
//         })
//     }
//     next();
// }
// exports.getAllTour = (req,res)=>{
//     res.status(200).json({
//         status:'success',
//         result: tours.length,
//         data: {
//             tours
//         }
//     });
// }
// exports.getTour =(req,res)=>{

//     const id = req.params.id*1

//     const tour = tours.find(el=> el.id === id);
//     res.status(200).json({
//         status:'success',
//         data:{
//             tour
//         }
//     })

// }

// exports.updateTour =(req, res)=>{

//      res.status(200).json({
//          status:'success',
//          data:{
//              tour:'<updated tour here...>'
//          }
//      })
// }

// exports.deleteTour =(req,res)=>{
    
//     res.status(204).json({
//         status:'success',
//         data: null
//     })

// }
// exports.postTour =(req,res)=>{
//     const id = tours[tours.length -1].id+1;
//     const newTour = Object.assign({id: id}, req.body);
//     tours.push(newTour);

//     fs.writeFile(`${__dirname}/../starter/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
//         res.status(201).json({
//             status:'success',
//             data:{
//                 tour: newTour
//             }
//         })
//     })
    

// }
