const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path:'./config.env' })

const DB = process.env.DATABASE_URL
// const DB = process.env.DATABASE_LOCAL
mongoose.connect(DB).then(con=> {
    // console.log(con.connection);
    console.log('database is connected');
});


const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`surver running on port ${PORT}`);})

// console.log('work')