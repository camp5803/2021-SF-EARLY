const regexValidater = (data, type) => {
    const idValidater = /^[0-9a-zA-Z]{1,15}$/g;
    const emailValidater = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
    const passwdValidater = /(?=.*\d{1,50})(?=.*[~`!@#$%\^\_&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/g;

    if (type == 'id') {
        data = idValidater.exec(data);
        console.log(data)
        if (data == null) {
            return false;
        } else {
            return true;
        }
    } else if (type == 'email') {
        data = emailValidater.exec(data);
        console.log(data);
        if (data == null) {
            return false;
        } else {
            return true;
        }
    } else if (type == 'passwd') {
        data = passwdValidater.exec(data);
        console.log('pw: ' + data);
        if (data == null) {
            return false;
        } else {
            return true;
        }
    } else {
        console.error(`TypeError: 알 수 없는 타입 또는 undefined: ${type}`);
        return false;
    }
}

module.exports = {
    regexValidater,
}