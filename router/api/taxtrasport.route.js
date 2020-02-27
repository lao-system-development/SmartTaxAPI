const express = require('express');
const asyncHandler = require('express-async-handler')
const taxCtrl = require('../../controller/taxtrasport.controller')
const { auth } = require('../../middleware/auth')
const router = express.Router();
module.exports = router;

router.get('/tax/checkpayment', auth, asyncHandler(taxCtrl.checkPayment));




