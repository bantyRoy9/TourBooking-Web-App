const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();

router.post('/signUp', authController.signUp);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect)

router.patch('/updatePassword',authController.updatePassword)
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe',userController.uploadPhoto,userController.resizePhoto, userController.updateUserData);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'))

router.route('/')
    .get(userController.getAllUser)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router
