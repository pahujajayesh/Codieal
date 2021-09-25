const express=require('express');
const router=express.Router();
const usersController=require('../controllers/user_controller');

router.get('/sign-in',usersController.sign_in);
router.get('/sign-up',usersController.sign_up);
router.get('/profile',usersController.profile);
router.post('/create',usersController.create);
router.post('/createSession',usersController.createSession);
module.exports=router;