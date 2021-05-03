const authorization = (req, res, next) => {
    if (req.session.logined != true) {
        res.redirect('/');
        return;
    } else if (req.session.users.banned == true) {
        res.send(
            `
            대회 규칙을 따르지 않았거나, <br>
            대회 운영에 방해를 한 것으로 확인 되어 <br>
            계정을 정지시켰습니다. <br><br>

            그러한 행동을 하지 않았거나, 억울한 사연이 있다면<br>
            연락이 가능한 운영진에게 바로 연락 바랍니다.
            `
            );
            return;
    }
    next();
}

const accounting = (req, res, next) => {
    if ('logined' in req.session == true) {
        if (req.session.logined == true) {
            res.redirect('/notice');
            return;
        } else {
            next();
        }
    } else {
        next();
    }
}

module.exports = {
    authorization,
    accounting,
}