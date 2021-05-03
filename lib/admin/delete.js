const db = require('../mariadb/admin_query');

const challHandler = async (req, res) => {
    await db.deleteChallData(req.params.puid);
    res.redirect('/kingkingsecu/chall');
};

const userHandler = async (req, res) => {
    await db.deleteUserData(req.params.uuid);
    res.redirect('/kingkingsecu');
};

const noticeHandler = async (req, res) => {
    await db.deleteNoticeData(req.params.nuid);
    res.redirect('/kingkingsecu/notice');
};

module.exports = {
    challHandler,
    userHandler,
    noticeHandler,
};