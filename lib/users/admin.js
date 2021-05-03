const db = require('../mariadb/login_query');

const isAdmin = (req, res, next) => {
    if (req.session.users.mem_type == 'Admin') {
        next();
    } else {
        res.redirect('/');
        return;
    }
};

const readAdminPage = async (req, res, next) => {
    const userData = await db.selectWholeData();
    res.render('admin', { data: userData })
};

module.exports = {
    isAdmin,
    readAdminPage,
}