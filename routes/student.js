const express = require('express');
const multer = require('multer');
const StudentConrollers = require('../controllers/StudentControllers');
const router = express.Router();


const upload = multer({
    storage : multer.diskStorage({}),
    limits: {fileSize : 10 * 1024 * 1024},
})
router.post('/add/student',upload.single('StudentImage'),(req,res)=>{
    console.log("add StudentControllers")
    StudentConrollers.addstudent(req,res)
})
router.get('/delete/student/:_id',(req,res)=>{
    StudentConrollers.deleteStudent(req,res)
})
router.get('/edit/student/page/:_id',(req,res)=>{
    StudentConrollers.openEditPage(req,res);
})
router.post('/edit/student/:_id',(req,res)=>{
    StudentConrollers.editStudent(req,res);
})
module.exports = router;