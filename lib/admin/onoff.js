const db = require('../mariadb/admin_query');

const banUser = async (req, res) => {
    await db.updateData(`UPDATE users.register SET banned = true WHERE uuid = ?`, [req.params.uuid]);
    res.redirect('/kingkingsecu');
};

const unbanUser = async (req, res) => {
    await db.updateData(`UPDATE users.register SET banned = false WHERE uuid = ?`, [req.params.uuid]);
    res.redirect('/kingkingsecu');
};

const turnOnChall = async (req, res) => {
    await db.updateData(`UPDATE boards.chall SET active = true WHERE puid = ?`, [req.params.puid]);
    res.redirect('/kingkingsecu/chall');
};

const turnOffChall = async (req, res) => {
    await db.updateData(`UPDATE boards.chall SET active = false WHERE puid = ?`, [req.params.puid]);
    res.redirect('/kingkingsecu/chall');
};

module.exports = {
    banUser,
    unbanUser,
    turnOnChall,
    turnOffChall,
};