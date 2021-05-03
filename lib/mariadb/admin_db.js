const mariadb = require('mariadb');
const adminConf = require('./secret/admin.json');

const makeError = async () => { new Error('Query Error'); }
const adminPool = mariadb.createPool(adminConf);

const adminPoolConnect = () => {
    const conn = adminPool.getConnection();
    return conn;
};

const adminPoolQuery = async (query, arr) => {
    const adminPoolConnection = await adminPoolConnect();
    let queryResult;
    try {
        queryResult = await adminPoolConnection.query(query, arr);
        adminPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        adminPoolConnection.end();
        throw err;
    }
    return queryResult;
};

const adminPoolEnd = () => {
    adminPool.end();
}

module.exports = {
    adminPoolQuery,
    adminPoolEnd,
};