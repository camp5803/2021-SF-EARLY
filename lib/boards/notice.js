const db = require('../mariadb/notice_query');
const noticeReader = require('./notice_reader').noticeReader;
const postReader = require('./notice_reader').postReader;

const handler = (req, res, next) => {
    const data = req.body;
    if (req.session.users.mem_type != 'Admin') {
        res.redirect('/');
        return;
    }
    db.insertNoticeData(data);
    next();
};

const renderNotice = async (req, res) => {
    const data = await noticeReader();
    res.render('notice', { 
        data,
        sess: req.session, 
        route: '../'
    });

};

const redirectNotice = async (req, res) => {
    res.redirect('/notice')
}

const renderPost = async (req, res) => {
    const data = await postReader(req.params.id);
    if (data == null) {
        res.redirect('/notice');
        return;
    }
    res.render('notice-detail', { data, sess: req.session, route: '../../' });
};

module.exports = {
    handler,
    renderNotice,
    renderPost,
    redirectNotice,
};

// 게시글 올리는 것 만 구현하고 notice는 따로임 ....