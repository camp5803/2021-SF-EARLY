const mariadb = require('mariadb');
const fileConf = require('./secret/file.json');

const makeError = async () => { new Error('Query Error'); }
const filePool = mariadb.createPool(fileConf);

const filePoolConnect = () => {
    const conn = filePool.getConnection();
    return conn;
};

const filePoolQuery = async (query, arr) => {
    const filePoolConnection = await filePoolConnect();
    let queryResult;
    try {
        queryResult = await filePoolConnection.query(query, arr);
        filePoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        filePoolConnection.end();
        throw err;
    }
    return queryResult;
};

const filePoolEnd = () => {
    filePool.end();
}

module.exports = {
    filePoolQuery,
    filePoolEnd,
};

// 이거 중복 검사 로직 추가해야함 -> 개별 모듈에서 함 -> 완료