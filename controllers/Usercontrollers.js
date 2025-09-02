const User = require('../models/User');
const Student = require('../models/Student');
const bcrypt = require('bcrypt');

async function addUser (req, res) {
    try {
        console.log(req.body, 'req.body');
        let user = new User(req.body);

        let encryptedPassword = bcrypt.hashSync(req.body.Password, 10);
        console.log(encryptedPassword, 'encryptedPassword');
        user.Password = encryptedPassword;

        await user.save();
        console.log("Data is saved successfully");
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

async function dologin(req, res) {
    try {
        console.log(req.body, 'req.body');
        let user = await User.findOne({ Email: req.body.Email });
        console.log('user', user);

        if (user) {
            let validPassword = await bcrypt.compare(req.body.Password, user.Password);
            if (validPassword) {
                if (user.usertype === 'Admin') {
                    let students = await Student.find({});
                    return res.render('welcomeadmin', {
                        students: students
                    });
                } else {
                    // You can add handling for other user types here
                    return res.send('<h1>Welcome user</h1>');
                }
            } else {
                return res.status(401).send('<h1>Invalid email/password</h1>');
            }
        } else {
            return res.status(404).send('<h1>User does not exist</h1>');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addUser ,
    dologin
};
