const mariadb = require('mariadb');
const registerConf = require('./secret/register.json');

const makeError = async () => { new Error('Query Error'); }
const registerPool = mariadb.createPool(registerConf);

const registerPoolConnect = () => {
    const conn = registerPool.getConnection();
    return conn;
};

const registerPoolQuery = async (query, arr) => {
    const registerPoolConnection = await registerPoolConnect();
    let queryResult;
    try {
        queryResult = await registerPoolConnection.query(query, arr);
        registerPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        registerPoolConnection.end();
        throw err;
    }
    return queryResult[0];
};

module.exports = {
    registerPoolQuery,
};

// 이거 중복 검사 로직 추가해야함 -> 개별 모듈에서 함 -> 완료