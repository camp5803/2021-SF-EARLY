const mariadb = require('mariadb');
const solverListConf = require('./secret/solverlist.json');

const makeError = async () => { new Error('Query Error'); }
const solverListPool = mariadb.createPool(solverListConf);

const solverListPoolConnect = () => {
    const conn = solverListPool.getConnection();
    return conn;
};

const solverListPoolQuery = async (query, arr) => {
    const solverListPoolConnection = await solverListPoolConnect();
    let queryResult;
    try {
        queryResult = await solverListPoolConnection.query(query, arr);
        solverListPoolConnection.end();
    } catch (err) {
        console.error(await makeError());
        solverListPoolConnection.end();
        throw err;
    }
    return queryResult;
};

const solverListPoolEnd = () => {
    solverListPool.end();
}

const selectSolverData = async (data) => {
    try {
        const res = await solverListPoolQuery(`select users.register.mem_type, users.register.nickname, boards.solver.solved_at from boards.solver left join users.register on boards.solver.uuid = users.register.uuid where mem_type NOT IN (?) and puid = (?) order by boards.solver.solved_at asc;`, ['Admin', data]);
        return res;
    } catch(err) {
        throw err;
    }
};


module.exports = {
    selectSolverData,
};