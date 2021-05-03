const mariadb = require('mariadb');
const noticeConf = require('./secret/notice.json');

const makeError = async () => { new Error('Query Error'); }
const noticePool = mariadb.createPool(noticeConf);

const noticePoolConnect = () => {
    const conn = noticePool.getConnection();
    return conn;
};

const noticePoolQuery = async (query, arr) => {
    const noticePoolConnection = await noticePoolConnect();
    let queryResult;
    try {
        queryResult = await noticePoolConnection.query(query, arr);
        noticePoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        noticePoolConnection.end();
        throw err;
    }
    return queryResult;
};

const noticePoolEnd = () => {
    noticePool.end();
}

module.exports = {
    noticePoolQuery,
    noticePoolEnd,
};

// 이거 중복 검사 로직 추가해야함 -> 개별 모듈에서 함 -> 완료