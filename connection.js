const mongoose = require('mongoose');
 async function connectDB() {
    try{
         await mongoose.connect('mongodb://localhost:27017/ejsstudentproject')
         console.log('database is connect successfully');
    }
   catch(err){
    console.log(err);
   }
}
module.exports = connectDB;
