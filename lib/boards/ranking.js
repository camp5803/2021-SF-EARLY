const db = require('../mariadb/score_query');

const renderRanking = async () => {
    const data = await db.selectWholeData('SELECT * FROM users.score WHERE NOT mem_type IN (?) ORDER BY uscore DESC, usolved_at ASC;', ['Admin']);
    return data;
};

const renderRankingByType = async (type) => {
    const data = await db.selectWholeData(`SELECT * FROM users.score WHERE mem_type = (?) ORDER BY uscore DESC, usolved_at ASC;`, [type]);
    return data;
}

module.exports = {
    renderRanking,
    renderRankingByType,
}