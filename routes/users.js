const express = require('express');
const router = express.Router();

const signupHandler = require('../lib/users/signup').handler;
const signupError = require('../lib/users/signup').errHandler;
const signupRender = require('../lib/users/signup').renderSignup;
const loginHandler = require('../lib/users/login').handler;
const loginError = require('../lib/users/login').errHanlder;
const loginRender = require('../lib/users/login').renderLogin;
const Authorization = require('../lib/aaa').authorization;
const Accounting = require('../lib/aaa').accounting;
const etcRender = require('../lib/users/etc');

router.get('/', Accounting, loginRender);
router.get('/logout', etcRender.killSession)
router.get('/signup', signupRender);
router.get('/profile', Authorization, etcRender.profile);

router.post('/', loginHandler, loginError);
router.post('/signup', signupHandler, signupError);

module.exports = router;