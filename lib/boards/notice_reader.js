const db = require('../mariadb/notice_query');

const noticeReader = async () => {
    let res = await db.selectNoticeData('SELECT * FROM boards.notice;');
    delete res.created_at;
    return res;
}

const postReader = async (data) => {
    let res = await db.selectNoticeData('SELECT * FROM boards.notice where nuid = (?)', [data]);
    return res[0];
}

module.exports = { 
    noticeReader,
    postReader,
};