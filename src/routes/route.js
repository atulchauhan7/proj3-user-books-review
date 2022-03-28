const express=require('express')
const router=express.Router();

const userModel=require('../models/userModel');
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')
const middleware=require('../middlewares/auth')
 
router.post('/register',userController.createUser);

router.post('/login',userController.login);

router.post('/createBooks',bookController.createBook); 

router.get('/getBooks',middleware.validateBookToken,bookController.getBooks)


module.exports=router;