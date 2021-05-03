const express = require('express');
const router = express.Router();
const Authorization = require('../lib/aaa').authorization;

router.use('*', Authorization, (req, res, next) => {
    res.redirect('/notice')
});

router.get('*', (err, req, res, next) => {
    res.status(500).render('error');
});

module.exports = router;