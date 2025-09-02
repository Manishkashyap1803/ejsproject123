const express = require('express');
const router = express.Router();
const usercontrollers = require('../controllers/Usercontrollers');

router.get('/',(req,res)=>{
    res.render('home');
});
router.get('/user/signup',(req,res)=>{
    res.render('signup');
});
router.post('/add/user',(req,res)=>{
    usercontrollers.addUser(req,res)
})
router.post('/login',(req,res)=>{
    usercontrollers.dologin(req,res);
})
router.get('/student/add/page',(req,res)=>{
    res.render('addstudent');
});
module.exports = router;