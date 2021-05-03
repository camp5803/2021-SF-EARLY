const query = require('../mariadb/login_query');
const log = require('../logger');

const handler = async (req, res, next) => {
    const data = req.body;
    const result = await query.loginQuery(data);
    if (result.stat !== true) {
        req.session.loginErr = result.stat;
        req.session.logined = false;
        next();
    } else {
        req.session.loginErr = null;
        req.session.logined = true;
        req.session.users = result;
        log.logger_login(req, `\n${result.nickname} 님이 로그인`);

        res.redirect('/notice');
        return;
    }
};

const errHanlder = (req, res, next) => {
    res.render('play', { err: req.session.loginErr });
};

const renderLogin = (req, res) => {
    res.render('play', { err: null });
};

module.exports = {
    handler,
    errHanlder,
    renderLogin
};

// 글자수체크