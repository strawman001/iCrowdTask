const express = require('express');
const router = express.Router();

const loginInterceptor = require('../interceptor/loginInterceptor');
const googleRegisterInterceptor = require('../interceptor/googleRegisterInterceptor');

router.use('*',loginInterceptor);
router.use('*',googleRegisterInterceptor);

module.exports = router;