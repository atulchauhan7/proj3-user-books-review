const express=require('express')
const router=express.Router();

const userModel=require('../models/userModel');
const userController=require('../controllers/userController')
const bookController=require('../controllers/bookController')
const middleware=require('../middlewares/auth')
const reviewController=require('../controllers/reviewController')
 //users
router.post('/register',userController.createUser);

router.post('/login',userController.login);
//books
router.post('/createBooks',middleware.validateUser,bookController.createBook); 

router.get('/getBooks',bookController.getBooks)

router.get('/getBooksById/:bookId',bookController.getBooksById)  

router.put('/updateBooks/:bookId',bookController.updateBooks)

router.delete('/deleteBookById/:bookId',bookController.deleteBookById)
//review
router.post('/bookReview/:bookId/review',reviewController.createReview)

router.put('/updateReviewById/:bookId/review/:reviewId',reviewController.updateReviewById)

router.delete('/deleteReviewById/:bookId/review/:reviewId',reviewController.deleteReviewById)

module.exports=router;