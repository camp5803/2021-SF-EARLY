const udb = require('../mariadb/login_query');
const cdb = require('../mariadb/chall_query');
const ndb = require('../mariadb/notice_query');
const fs = require('fs');

const challRender = async (req, res) => {
    const userData = await cdb.selectChallData(`SELECT * FROM boards.chall;`);
    res.render("chall-post", { data: userData });
};

const noticeRender = async (req, res) => {
    const userData = await ndb.selectNoticeData(`SELECT * FROM boards.notice;`);
    res.render("notice-post", { data: userData });
};

const modUserRender = async (req, res) => {
    const queryData = await udb.selectUuidData(req.params.uuid);
    res.render("admin-mod", { data: queryData, uuid: req.params.uuid });
};

const modNoticeRender = async (req, res) => {
    const queryData = await ndb.selectNoticeData(`SELECT * FROM boards.notice WHERE nuid = ?`, [req.params.nuid]);
    res.render("notice-mod", { data: queryData[0], nuid: req.params.nuid });
};

const modChallRender = async (req, res) => {
    const queryData = await cdb.selectChallData(`SELECT * FROM boards.chall WHERE puid = ?`, [req.params.puid]);
    res.render("chall-mod", { data: queryData[0], puid: req.params.puid });
};

const challAdder = (req, res) => {
    res.render('chall-add');
};

const noticeAdder = (req, res) => {
    res.render('notice-add');
};

const redirectChall = (req, res) => {
    res.redirect('/kingkingsecu/chall_post');
};

const redirectNotice = (req, res) => {
    res.redirect('/kingkingsecu/notice_post');
};

const logRender = (req, res) => {
    fs.readdir('./log', "utf8", (err, files) => {
        if (err) {
            res.send('err');
            throw err;
        }
        res.render('log', { files })
    })
};

const logDownloader = (req, res) => {
    try {
        if (fs.existsSync('./log/' + req.params.filename)) {
            res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.filename);
            res.setHeader('Content-Type', 'text/plain');
            const filestream = fs.createReadStream('./log/' + req.params.filename);
            filestream.pipe(res);
        } else {
            res.send(`
            ?????? ???????????? ??? '??????' ??????! <br>
            ?????? ????????? ?????? ????????? ???????????? ??????????????? ???????????????!
        `);
            return;
        }
    } catch (err) {
        console.error(err);
        res.send(`
        ?????? ???????????? ??? '??????' ??????! <br>
        ?????? ????????? ?????? ????????? ???????????? ??????????????? ???????????????!
    `);
        return;
    }
}

module.exports = {
    challRender,
    noticeRender,
    modUserRender,
    modNoticeRender,
    modChallRender,
    challAdder,
    noticeAdder,
    redirectChall,
    redirectNotice,
    logRender,
    logDownloader,
};