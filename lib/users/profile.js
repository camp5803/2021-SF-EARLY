const db = require('../mariadb/score_query');

const readScore = async (data) => {
    const score = await db.selectScoreData('SELECT * FROM users.score WHERE uuid = (?)', [data]);
    
    if (score != undefined) {
        return score;
    } else {
        return;
    }
};

module.exports = {
    readScore,
};