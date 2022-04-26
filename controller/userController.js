const multer = require('multer');
const sharp = require('sharp')
const User = require('./../modals/userModal');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { getOne, getAll, createOne,updateOne,deleteOne } = require('./factoryHandler');

// const multerStorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/img/users');
//     },
//     filename:(req,file,cb)=>{
//         const ext = file.mimetype.split('/')[1];
//         cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// })
const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb(new AppError('Not an Image! Please upload only Img', 400))
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
})

exports.uploadPhoto = upload.single('photo')

exports.resizePhoto = catchAsync(async(req,res,next)=>{
    if(!req.file) return next()
    req.file.filename = `user-${req.user.id}-${Date.now().jpeg}`;
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({ quality: 90}).toFile(`public/img/users/${req.file.filename}`);
    next();
})

const filterObj = (obj, ...allowedFields)=>{
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
}
exports.getMe = (req,res,next) =>{
    req.params.id = req.user.id
    next();
};
exports.createUser = createOne(User);
exports.getAllUser = getAll(User);
exports.getUser = getOne(User); 
exports.updateUser = updateOne(User);
exports.deleteUser = deleteOne(User);



exports.updateUserData =catchAsync(async(req, res,next)=>{
    console.log(req.body);
    if(req.body.password || req.body.passwordconfirm ){
        return next( new AppError('This Route is not for password updates. please use /updateMyPassword', 400))
    }
    
    // filtered out unwanted fileds name which not updated

    const filterBody = filterObj(req.body, 'name','email')
    if(req.file) filterBody.photo = req.file.filename
    // console.log(filterBody);
    // console.log(req.user);

    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody , {
        new:true,
        runValidators:true
    })
    // if(!updatedUser){
    //     return next(new AppError('No User Found With This ID', 404))
    // }
     res.status(200).json({
         status:'success',
         data:{
             user: updatedUser
         }
     })
 
})

exports.deleteMe = catchAsync(async(req,res,next)=>{
    
    // if(req.params.id*1 > tours.id){
    //     return res.status(404).json({
    //         status:'fail',
    //         message:'invalid data'
    //     })
    // }

    const user = await User.findByIdAndUpdate( req.user.id, {active: false});

     res.status(200).json({
         status:'success',
         data: null
        })
})
