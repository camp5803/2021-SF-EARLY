const db = require('./score_query');

const scoreHandler = async (uuid, data) => {
    const queryData = await selectScore(uuid);
    insertScore(uuid, data, queryData);
};

const selectScore = async (uuid) => {
    const queryData = await db.selectScoreData('SELECT * FROM users.score WHERE uuid = (?)', [uuid]);
    return queryData;
};

const insertScore = async (uuid, data, queryData) => {
    const handleData = {
        solved_num: queryData.solved_num + 1,
        uscore: queryData.uscore + data.pscore,
        solved_at: data.csolved_at,
        uuid,
    };
    await db.updateScoreData(handleData);
}

module.exports = {
    scoreHandler,
};