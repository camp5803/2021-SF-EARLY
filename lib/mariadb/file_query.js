const db = require('./file_db');

const insertFileData = async (puid, data) => {
    try {
        await db.filePoolQuery('INSERT INTO boards.filedata (puid, filename, size, mimetype, originalname) VALUES (?, ?, ?, ?, ?);', [puid, data.filename, data.size, data.mimetype, data.originalname]);
    } catch(err) {
        throw err;
    }
}
const selectFileData = async (query, data) => {
    try {
        const res = await db.filePoolQuery(query, data);
        return res;
    } catch(err) {
        throw err;
    }
}

const selectOneData = async (data) => {
    try {
        const res = await db.filePoolQuery(`SELECT * FROM boards.filedata WHERE puid = ?`, data);
        return res;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    insertFileData,
    selectFileData,
    selectOneData,
};