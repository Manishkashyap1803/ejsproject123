const bcrypt = require('bcrypt')
const User = require('./models/User');
async function makeAdmin(){
    try{
        let user = await User.findOne({Email: 'manishkashyap8479@gmail.com'})
        if(user){
            console.log("user updated")
        }else{
            user = new User();
        user.FirstName = 'MANISH';
        user.LastName = 'KASHYAP';
        user.Email = 'manishkashyap8479@gmail.com';
        let encryptredPassword = bcrypt.hashSync('12345', 10);
         user.Password = encryptredPassword;
        user.usertype = 'Admin',
        await user.save();
        console.log('user saved successfully......');
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports = makeAdmin