const db = require('./chall_db');

const insertChallData = async (data, author) => {
    try {
        await db.challPoolQuery('INSERT INTO boards.chall (pname, prob_type, pscore, prob_info, prob_flag, author) VALUES (?, ?, ?, ?, ?, ?);', [data.pname, data.prob_type, data.pscore, data.prob_info, data.prob_flag, author]);
    } catch(err) {
        throw err;
    }
}
const selectChallData = async (query, data) => {
    try {
        const res = await db.challPoolQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    insertChallData,
    selectChallData,
};