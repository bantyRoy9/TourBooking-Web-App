const express = require('express');
const viewController = require('./../controller/viewcontroller')
const authController = require('./../controller/authController');

const router = express.Router();


router.get('/',
  authController.isLoggedIn,
  viewController.getOverview)

router.get('/tour/:slug',
  authController.isLoggedIn,
  viewController.getTourview
)

router.get('/login',
  authController.isLoggedIn,
  viewController.login
)
router.get('/signup', viewController.signup)

router.get('/ME',
  authController.protect,
  viewController.getAccount
)

router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post('/submit-user-data', authController.protect,viewController.updateUserData);
module.exports = router