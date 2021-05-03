const mariadb = require('mariadb');
const loginConf = require('./secret/login.json');

const makeError = async () => { new Error('Query Error'); }
const loginPool = mariadb.createPool(loginConf);

const loginPoolConnect = () => {
    const conn = loginPool.getConnection();
    return conn;
};

const loginPoolQuery = async (query, arr) => {
    const loginPoolConnection = await loginPoolConnect();
    let queryResult;
    try {
        queryResult = await loginPoolConnection.query(query, arr);
        loginPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        loginPoolConnection.end();
        throw err;
    }
    return queryResult[0];
};

const adminPoolQuery = async (query, arr) => {
    const loginPoolConnection = await loginPoolConnect();
    let queryResult;
    try {
        queryResult = await loginPoolConnection.query(query, arr);
        loginPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        loginPoolConnection.end();
        throw err;
    }
    return queryResult;
};

module.exports = {
    loginPoolQuery,
    adminPoolQuery,
};