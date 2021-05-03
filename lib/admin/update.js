const db = require('../mariadb/admin_query');

const userHandler = async (req, res) => {
    await db.updateData(`UPDATE users.register SET nickname = ?, mem_type = ?, email = ? WHERE uuid = ?`, [req.body.nickname, req.body.mem_type, req.body.email, req.params.uuid]);
    await db.updateData(`UPDATE users.score SET nickname = ?, mem_type = ? WHERE uuid = ?`, [req.body.nickname, req.body.mem_type, req.params.uuid]);
    res.redirect('/kingkingsecu');
};

const challHandler = async (req, res) => {
    await db.updateData(`UPDATE boards.chall SET pname = ?, prob_type = ?, pscore = ?, prob_info = ?, prob_flag = ? WHERE puid = ?`, [req.body.pname, req.body.prob_type, req.body.pscore, req.body.prob_info, req.body.prob_flag, req.params.puid]);
    res.redirect('/kingkingsecu/chall');
};

const challSwitch = async (req, res) => {
    await db.updateData(`UPDATE boards.chall SET active = ? WHERE puid = ?`, [req.body.switch, req.params.puid]);
    res.redirect('/kingkingsecu/chall');
}

const noticeHandler = async (req, res) => {
    await db.updateData(`UPDATE boards.notice SET title = ?, content = ? WHERE nuid = ?`, [req.body.title, req.body.content, req.params.nuid]);
    res.redirect('/kingkingsecu/notice');
};

module.exports = {
    challHandler,
    userHandler,
    noticeHandler,
    challSwitch,
};