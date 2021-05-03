const db = require('./admin_db');

const updateData = async (query, data) => {
    try {
        await db.adminPoolQuery(query, data);
    } catch(err) {
        throw err;
    }
}
const deleteUserData = async (data) => {
    try {
        const res = await db.adminPoolQuery(`DELETE FROM users.register WHERE uuid = ?`, data);
        return res;
    } catch(err) {
        throw err;
    }
}

const deleteChallData = async (data) => {
    try {
        const res = await db.adminPoolQuery(`DELETE FROM boards.chall WHERE puid = ?`, data);
        return res;
    } catch(err) {
        throw err;
    }
}

const deleteNoticeData = async (data) => {
    try {
        const res = await db.adminPoolQuery(`DELETE FROM boards.notice WHERE nuid = ?`, data);
        return res;
    } catch(err) {
        throw err;
    }
}

// 아래는 어드민 권한 아님 그냥 update 권한이 필요해서 넘어옴

const challCounter = async (count, puid) => {
    try {
        const res = await db.adminPoolQuery(`UPDATE boards.chall SET count = ? WHERE puid = ?`, [count, puid]);
        return res;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    updateData,
    deleteChallData,
    deleteNoticeData,
    deleteUserData,
    challCounter,
};