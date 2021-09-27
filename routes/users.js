const express=require('express');
const router=express.Router();
const passport=require('passport');
const usersController=require('../controllers/user_controller');

router.get('/profile',passport.checkAuthentication, usersController.profile);

router.get('/sign-in',usersController.sign_in);
router.get('/sign-up',usersController.sign_up);

router.post('/create',usersController.create);

router.post('/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);


module.exports=router;