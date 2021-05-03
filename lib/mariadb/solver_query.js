const db = require('./solver_db');

const insertSolverData = async (data) => {
    try {
        await db.solverPoolQuery('INSERT INTO boards.solver (puid, uuid, pscore) VALUES (?, ?, ?);', data);
    } catch(err) {
        throw err;
    }
};

const selectSolverData = async (query, data) => {
    try {
        const res = await db.solverPoolQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
};

const selectWholeData = async (query, data) => {
    try {
        const res = await db.solverWholeQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
};

module.exports = {
    insertSolverData,
    selectSolverData,
    selectWholeData,
};

// 작동 확인