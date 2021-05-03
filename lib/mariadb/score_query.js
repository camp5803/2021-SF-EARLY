const { query } = require('express');
const db = require('./score_db');

const insertScoreData = async (data) => {
    try {
        await db.scorePoolQuery('INSERT INTO users.score (uuid, nickname, mem_type) VALUES (?, ?, ?);', [data.uuid, data.nickname, data.mem_type]);
    } catch(err) {
        throw err;
    }
};

const selectScoreData = async (query, data) => {
    try {
        const res = await db.scorePoolQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
};

const selectWholeData = async (query, data) => {
    try {
        const res = await db.scoreWholeQuery(query, data);
        return res;
    } catch (err) {
        throw err;
    }
}

const updateScoreData = async (data) => {
    try {
        await db.scorePoolQuery('UPDATE users.score SET solved_num = ?, uscore = ?, usolved_at = ? WHERE uuid = ?', [data.solved_num, data.uscore, data.solved_at, data.uuid]);
    } catch(err) {
        throw err;
    };
}

module.exports = {
    insertScoreData,
    selectScoreData,
    selectWholeData,
    updateScoreData,
};

// 작동 확인