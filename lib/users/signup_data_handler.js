const db = require('../mariadb/register_db');
const regx = require('./regex');

const processingData = (body) => {
    let user = body;
    return user;
};

const confirmData = async (data) => {
    let stat = new Array();
    try {
        confirmPw(data);
        stat[0] = await confirmId(data);
        stat[1] = await confirmEmail(data);
    } catch (err) {
        throw err;
    }

    if (!regx.regexValidater(data.id, 'id')) {
        if (stat[0] == null) {
            stat[0] = '올바르지 않은 아이디입니다.';
        } else {
            stat[0] += '\n 올바르지 않은 아이디입니다.';
        }
    }
    if (!regx.regexValidater(data.email, 'email')) {
        if (stat[1] == null) {
            stat[1] = '올바르지 않은 이메일입니다.';
        } else {
            stat[1] += '\n 올바르지 않은 이메일입니다.';
        }
    }
    if (!regx.regexValidater(data.passwd, 'passwd')) {
        stat[2] = '올바르지 않은 비밀번호입니다.';
    }

    return stat;
};

const confirmPw = (data) => {
    if(data.passwd != data.repasswd) {
        console.error('비밀번호가 일치하지 않습니다.');
    } else {
        delete data.repasswd;
    }
};

const confirmId = async (data) => {
    const res = await db.registerPoolQuery(`SELECT * FROM users.register WHERE id = (?)`, [data.id]);
    if (res != null) {
        return '이미 존재하는 아이디입니다.';
    } else {
        return null;
    }
};

const confirmEmail = async (data) => {
    const res = await db.registerPoolQuery(`SELECT * FROM users.register WHERE email = (?)`, [data.email]);
    if (res != null) {
        return '이미 존재하는 이메일입니다.';
    } else {
        return null;
    }
};
module.exports = {
    processingData,
    confirmData,
}