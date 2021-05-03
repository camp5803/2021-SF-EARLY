const db = require('./login_db');
const crypto = require('crypto');

const loginQuery = async (data) => {
    const passwd = crypto.createHash('sha512').update(data.passwd).digest('base64');
    const connectDB = await db.loginPoolQuery('SELECT * FROM register where id=(?)', [data.id]);
    if (connectDB == null) {
        return { stat: '존재하지 않는 아이디입니다.' };
    } else {
        if(passwd == connectDB.passwd) {
            connectDB.stat = true;
            return connectDB;
        } else {
            return { stat: '패스워드를 다시 확인하세요.' };
        }
    }
};

const selectUserData = async (data) => {
    const getuuid = await db.loginPoolQuery('SELECT * FROM users.register where id = (?)', [data]);
    return getuuid;
};

const selectWholeData = async () => {
    const data = await db.adminPoolQuery('SELECT * FROM users.register;');
    return data;
};

const selectUuidData = async (data) => {
    const userData = await db.loginPoolQuery('SELECT * FROM users.register where uuid = (?)', [data]);
    return userData;
};

module.exports = {
    loginQuery,
    selectUserData,
    selectWholeData,
    selectUuidData,
}