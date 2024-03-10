const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const environment = process.env.NODE_ENV;

dotenv.config({ path:'./config.env' })

const DB = process.env.DATABASE_URL
mongoose.connect(DB).then(con=> {
    console.log('database is connected');
});

const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`server running on port ${PORT}`,environment);})

// console.log('work')
