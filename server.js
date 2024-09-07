const mongoose = require('mongoose');
const app = require('./app');
const environment = process.env.NODE_ENV;
let DB = process.env.DATABASE_URL
if(environment === 'development'){
    DB = process.env.DATABASE_LOCAL
}
mongoose.connect(DB).then(con=> {
    console.log('database is connected');
});

const PORT =process.env.PORT || 8000;
app.listen(PORT,()=>{console.log(`server running on port ${PORT}`,environment);})

// console.log('work')
