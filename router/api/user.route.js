const express = require('express');
const asyncHandler = require('express-async-handler')
const userCtrl = require('../../controller/user.controller')
const { auth } = require('../../middleware/auth')
const router = express.Router();
module.exports = router;

router.post('/users/register', asyncHandler(userCtrl.CreateUser));
router.post('/users/login', asyncHandler(userCtrl.LoginUser));
router.put('/users/logout', asyncHandler(userCtrl.LogOut));
router.get('/users', auth, asyncHandler(userCtrl.GetUserData));
router.get('/users/vertify/:token', asyncHandler(userCtrl.VertifyFucn))
router.post('/users/reset_password', asyncHandler(userCtrl.ResetPassword))
router.post('/users/ChangePassword/:resetToken', asyncHandler(userCtrl.ChangePassword))




