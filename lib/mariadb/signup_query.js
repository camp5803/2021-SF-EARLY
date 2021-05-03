const db = require('./register_db');
const crypto = require('crypto');

const insertSignupData = async (data) => {
    const pw = crypto.createHash('sha512').update(data.passwd).digest('base64');
    try {
        await db.registerPoolQuery('INSERT INTO users.register (id, passwd, nickname, mem_type, email) VALUES (?,?,?,?,?);', [data.id, pw, data.nickname, data.mem_type, data.email]);
    } catch(err) {
        throw err;
    }
}

module.exports = {
    insertSignupData,
}