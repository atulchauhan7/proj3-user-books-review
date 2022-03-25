const express=require('express')
const router=express.Router();

const userModel=require('../models/userModel');
const userController=require('../controllers/userController')

router.post('/register',userController.createUser);

router.post('/login',userController.login);


module.exports=router;