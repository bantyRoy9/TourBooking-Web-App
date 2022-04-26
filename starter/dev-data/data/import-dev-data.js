const mongoose = require('mongoose');
const fs = require('fs')
const dotenv = require('dotenv');
const Tour = require('./../../../modals/tourModals');
const Review = require('./../../../modals/reviewModal');
const User = require('./../../../modals/userModal');

dotenv.config({ path:'./../../../config.env'})

const DB = process.env.DATABASE_URL;
// console.log(DB);

mongoose.connect(DB).then(()=>console.log('DB is Connected'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,'utf-8'));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,'utf-8'));

const importData = async()=>{
    try{
        await Tour.create(tours);
        // await User.create(users,{ validateBeforeSave: false});
        // await Review.create(reviews);
        console.log('tour data is created successful');
        process.exit();
    }catch(err){
        console.log(err);
    }
}

const deleteData = async()=>{
    try{
        await Tour.deleteMany();
        // await Review.deleteMany();
        // await User.deleteMany();
        console.log('tour data is delete successful');
        process.exit();
    }catch(err){
        console.log(err);
    }
}

if(process.argv[2]=== '--import'){
    importData();
}else if(process.argv[2]==='--delete'){
    deleteData();
}

// console.log(process.argv);
