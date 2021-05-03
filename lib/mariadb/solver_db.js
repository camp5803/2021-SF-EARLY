const mariadb = require('mariadb');
const solverConf = require('./secret/solver.json');

const makeError = async () => { new Error('Query Error'); }
const solverPool = mariadb.createPool(solverConf);

const solverPoolConnect = () => {
    const conn = solverPool.getConnection();
    return conn;
};

const solverPoolQuery = async (query, arr) => {
    const solverPoolConnection = await solverPoolConnect();
    let queryResult;
    try {
        queryResult = await solverPoolConnection.query(query, arr);
        solverPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        solverPoolConnection.end();
        throw err;
    }
    return queryResult[0];
};

const solverWholeQuery = async (query, arr) => {
    const solverPoolConnection = await solverPoolConnect();
    let queryResult;
    try {
        queryResult = await solverPoolConnection.query(query, arr);
        solverPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        solverPoolConnection.end();
        throw err;
    }
    return queryResult;
};

module.exports = {
    solverPoolQuery,
    solverWholeQuery,
};