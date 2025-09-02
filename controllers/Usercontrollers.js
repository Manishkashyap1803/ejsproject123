const User = require('../models/User');
const Student = require('../models/Student')
const bcrypt = require('bcrypt')
 async function addUser(req,res){
    try{
        console.log(req.body,'req.body');
        let user = new User(req.body);
       
        let encryptredPassword = bcrypt.hashSync(req.body.Password, 10);
        console.log(encryptredPassword, 'encryptredPassword')
        user.Password = encryptredPassword;
        await user.save();
        console.log("data is save is successfully");
        res.redirect('/');
        
    }
    catch (err){
        console.log(err);
    }
}
 async function dologin(req,res){
    try{
        console.log(req.body,'req.body');
        let user = await User.findOne({Email: req.body.Email});
        console.log('user',user);
        if(user){

            let validPassword =  await bcrypt.compare(req.body.Password,user.Password);
            if(validPassword){
                if(user.usertype==='Admin')
                let students = await Student.find({});
                res.render('welcomeadmin',{
                    students: students
                });
            }else{
                res.end('<h1> invalid email/password.............')
            }
        }
        else{
            res.end("<h1 user does not exsists.................>")
        }
    }
    catch (err){

    }
}
module.exports = {
    addUser,
    dologin
}