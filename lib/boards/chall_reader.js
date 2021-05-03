const db = require('../mariadb/chall_query');
const fdb = require('../mariadb/solver_query');

const challReader = async () => {
    let res = await db.selectChallData('SELECT * FROM boards.chall WHERE active = true;');
    delete res.csolved_at;
    return res;
};

const challReaderByType = async (data) => {
    let res = await db.selectChallData('SELECT * FROM boards.chall WHERE active = true AND prob_type = ?;', data);
    delete res.csolved_at;
    return res;
}

const postReader = async (data) => {
    const res = await db.selectChallData('SELECT * FROM boards.chall WHERE puid = (?)', [data]);
    return res[0];
};

const flagReader = async (data, param) => {
    const res = await db.selectChallData('SELECT * FROM boards.chall WHERE prob_flag = (?) AND puid = (?)', [data, param]);
    return res[0];
};

const flagHandler = async (data, uid) => {
    await fdb.insertSolverData([data.puid, uid, data.pscore]);
    return;
};

const solverReader = async (data) => {
    await fdb.selectSolverData('SELECT * FROM boards.solver WHERE puid = (?)', [data.puid])
};

module.exports = { 
    challReader,
    challReaderByType,
    postReader,
    flagReader,
    flagHandler,
    solverReader,
};