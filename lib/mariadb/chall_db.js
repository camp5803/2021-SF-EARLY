const mariadb = require('mariadb');
const challConf = require('./secret/chall.json');

const makeError = async () => { new Error('Query Error'); }
const challPool = mariadb.createPool(challConf);

const challPoolConnect = () => {
    const conn = challPool.getConnection();
    return conn;
};

const challPoolQuery = async (query, arr) => {
    const challPoolConnection = await challPoolConnect();
    let queryResult;
    try {
        queryResult = await challPoolConnection.query(query, arr);
        challPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        challPoolConnection.end();
        throw err;
    }
    return queryResult;
};

const challPoolEnd = () => {
    challPool.end();
}

module.exports = {
    challPoolQuery,
    challPoolEnd,
};

// 이거 중복 검사 로직 추가해야함 -> 개별 모듈에서 함 -> 완료