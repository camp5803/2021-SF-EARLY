const dataHandler = require('./signup_data_handler');
const db = require('../mariadb/signup_query');
const sdb = require('../mariadb/score_query');
const ldb = require('../mariadb/login_query');

const handler = async (req, res, next) => {
    const data = dataHandler.processingData(req.body);
    const errCheck = await dataHandler.confirmData(data);

    if(errCheck[0] != null || errCheck[1] != null || errCheck[2] != null) {
        req.session.signupErr = errCheck;
        next();
        return;
    } 
    await db.insertSignupData(data);
    let uuid = await ldb.selectUserData(data.id);
    await sdb.insertScoreData(uuid); 
    
    res.redirect('/');
};

const errHandler = (req, res) => {
    res.render('join', { err: req.session.signupErr });
}

const renderSignup = (req, res) => {
    res.render('join', { err: new Array(null, null, null) });
}

module.exports = {
    handler,
    errHandler,
    renderSignup,
}

// Admin 필터링 이메일 정규식
// 문자열 전부다 정규식으로 검사