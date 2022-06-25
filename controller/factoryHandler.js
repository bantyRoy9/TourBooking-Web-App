const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const APIFeaturs = require('./../utils/apiFeature')



exports.createOne = Modal => catchAsync(async (req, res)=>{
    // console.log(req.body);
    const doc = await Modal.create(req.body);
    // console.log(doc);
    res.status(201).json({
        status:'success',
        data:{
            data: doc
        }
    });
})
exports.getOne = (Modal, pop) => catchAsync(async(req,res,next) => {

    let query = Modal.findById(req.params.id);

    if(pop) query = query.populate(pop)
    
    const doc = await query;

    if(!doc){
        return next(new AppError('No document found with this ID', 404))
    }
    res.status(200).json({
        status:'success',
        data:{
            data: doc
        }
    })
});
exports.deleteOne = Modal =>  catchAsync(async(req,res,next)=>{
    const doc = await Modal.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError('No document found with this ID', 404))
    }
    res.status(204).json({
        status:'success',
        data:null
    })
});

exports.updateOne = Modal => catchAsync(async(req,res,next)=>{
    const docUpdate = await Modal.findByIdAndUpdate(req.params.id , req.body ,{
        new:true,
        runValidators:true
    });
    if(!docUpdate){
        return next(new AppError('No docUpdate found with this ID', 404))
    }
    res.status(200).json({
        status:'success',
        data:{
            docUpdate
        }
    })
});

exports.getAll = Modal => catchAsync(async(req,res)=>{
    let resultPerpage = 8;
  const docCount = await Modal.countDocuments();

    let filter = {};
    if(req.params.tourId) filter = { tour : req.params.tourId}
    const features = new APIFeaturs(Modal.find({}), req.query)
    .search()
    .filter()
    .sort()
    .fields()
    .pagination(resultPerpage);

    let tours = await features.query;

    let filterdCount = tours.length;



    res.status(200).json({
        status:'success',
        length:tours.length,
        data:{
            AllTours: tours,
            length:docCount,
            resultPerpage
        }
    })
});