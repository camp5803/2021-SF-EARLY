const db = require('./notice_db');

const insertNoticeData = async (data) => {
    try {
        await db.noticePoolQuery('INSERT INTO boards.notice (title, content) VALUES (?, ?);', [data.title, data.content]);
    } catch(err) {
        throw err;
    }
};

const selectNoticeData = async (query, data) => {
    try {
        const res = await db.noticePoolQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    insertNoticeData,
    selectNoticeData,
};

// 작동 확인