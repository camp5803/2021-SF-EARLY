const mariadb = require('mariadb');
const scoreConf = require('./secret/score.json');

const makeError = async () => { new Error('Query Error'); }
const scorePool = mariadb.createPool(scoreConf);

const scorePoolConnect = () => {
    const conn = scorePool.getConnection();
    return conn;
};

const scorePoolQuery = async (query, arr) => {
    const scorePoolConnection = await scorePoolConnect();
    let queryResult;
    try {
        queryResult = await scorePoolConnection.query(query, arr);
        scorePoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        scorePoolConnection.end();
        throw err;
    }
    return queryResult[0];
};

const scoreWholeQuery = async (query, arr) => {
    const scorePoolConnection = await scorePoolConnect();
    let queryResult;
    try {
        queryResult = await scorePoolConnection.query(query, arr);
        scorePoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        scorePoolConnection.end();
        throw err;
    }
    return queryResult;
};

module.exports = {
    scorePoolQuery,
    scoreWholeQuery,
};