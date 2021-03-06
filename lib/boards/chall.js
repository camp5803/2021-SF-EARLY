const db = require('../mariadb/chall_query');
const fdb = require('../mariadb/solver_query');
const fs = require('fs');
const path = require('path');
const mime = require('mime');
const { challReader, challReaderByType } = require('./chall_reader');
const { postReader } = require('./chall_reader');
const { flagHandler } = require('./chall_reader');
const { flagReader } = require('./chall_reader');
const { scoreHandler } = require('../mariadb/score_hanlder');
const { challCounter } = require('../mariadb/admin_query');
const { selectSolverData } = require('../mariadb/solverlist');
const filedb = require('../mariadb/file_query');
const log = require('../logger');
const { equal } = require('assert');


const handler = async (req, res, next) => {
    const data = req.body;
    if (req.session.users.mem_type != 'Admin') {
        res.redirect('/notice');
        return;
    }
    await db.insertChallData(data, req.session.users.nickname);
    const result = await db.selectChallData(`SELECT * FROM boards.chall WHERE pname = ?`, data.pname);
    
    next();
};

const filehandler = async (req, res, next) => {
    const data = req.body;
    if (req.session.users.mem_type != 'Admin') {
        res.redirect('/notice');
        return;
    }
    await db.insertChallData(data, req.session.users.nickname);
    const result = await db.selectChallData(`SELECT * FROM boards.chall WHERE pname = ?`, data.pname);
    await filedb.insertFileData(result[0].puid, req.file);
    
    next();
};

const renderChall = async (req, res) => {
    const data = await challReader();
    const solverData = await fdb.selectWholeData(`SELECT * FROM boards.solver WHERE uuid = ?`, req.session.users.uuid);
    res.render('challenge', { 
        data,
        solverData,
        sess: req.session, 
        type: '',
        route: ''
    });
};

const renderChallByType = async (req, res) => {
    const data = await challReaderByType(req.params.type);
    const solverData = await fdb.selectWholeData(`SELECT * FROM boards.solver WHERE uuid = ?`, req.session.users.uuid);
    res.render('challenge', { 
        data,
        solverData,
        sess: req.session, 
        type: req.params.type,
        route: '../',
    });
}

const renderPost = async (req, res) => {
    const data = await selectSolverData(req.params.id);
    req.session.challid = req.params.id;
    const challData = await postReader(req.params.id);
    if (challData == null) {
        res.redirect('/chall');
        return;
    }
    const fileData = await filedb.selectOneData(challData.puid);
    const solverData = await fdb.selectWholeData(`SELECT * FROM boards.solver WHERE uuid = ?`, req.session.users.uuid);
    if (challData.active == false) {
        res.redirect('/chall');
        return;
    }
    res.render('challenge-detail', { 
        data, 
        fileData,
        solverData,
        challData, 
        sess: req.session, 
        route: '../../',
        err: null,
    });
};

const confirmFlag = async (req, res) => {
    const data = await flagReader(req.body.prob_flag, req.session.challid);
    if (data == null) {
        log.logger_flag(req, `\n${req.session.users.nickname}?????? ${req.session.challid}??? ????????? ????????? ${req.body.prob_flag}??? ?????? ?????????`);
        res.render('flag', { 
            err: true, 
            msg: req.body.prob_flag, 
            link: '../chall', 
            route: '../'
        });
    } else {
        log.logger_flag(req, `\n${req.session.users.nickname}?????? ${req.session.challid}??? ????????? ????????? ${req.body.prob_flag}??? ?????? ?????????`);
        if (req.session.users.mem_type != 'Admin') {
            challCounter(data.count + 1, data.puid);
        }
        insertFlag(data, req.session.users.uuid);
        res.render('flag', { 
            err: false, 
            msg: req.body.prob_flag, 
            link: '../chall', 
            route: '../'
        });
    };
};

const readSolver = async (req, res, next) => {
    const data = await fdb.selectSolverData('SELECT * FROM boards.solver WHERE uuid = (?) AND puid = (?);', [req.session.users.uuid, req.session.challid]);
    if (data != null) {
        log.logger_flag(req, `\n${req.session.users.nickname}?????? ?????? ????????? ${req.session.challid}??? ????????? ????????? ${req.body.prob_flag}??? ?????? ?????????`);
        res.render('error', { route: '../', link: '../chall' }); // ?????? ????????? ??????
        return;
    } else {
        next(); // ?????? ?????? ?????????
    }
};

const insertFlag = (data, uuid) => {
    flagHandler(data, uuid);
    scoreHandler(uuid, data);
};

const downloader = async (req, res, next) => {
    const filedata = await filedb.selectOneData(req.params.id);
    const file = filedata[0].file_path + filedata[0].filename;
    const extension = filedata[0].originalname.slice(filedata[0].originalname.lastIndexOf('.'), filedata[0].originalname.length);
    console.log(extension);
    try {
        if (fs.existsSync(file)) {
            log.logger_download(req, `\n${req.session.users.nickname}?????? ${req.params.id}??? ????????? ?????? ${filedata[0].originalname}??? ???????????????`)
            const mimetype = filedata[0].mimetype
            res.setHeader('Content-Disposition', 'attachment; filename=' + filedata[0].filename + extension);
            res.setHeader('Content-Type', mimetype);
            const filestream = fs.createReadStream(file);
            filestream.pipe(res);
            //res.redirect(`/chall/${req.params.id}`);
        } else {
            res.send(`
                ?????? ???????????? ??? '??????' ??????! <br>
                ?????? ????????? ?????? ????????? ???????????? ??????????????? ???????????????!
            `);
            return;
        }
    } catch(err) {
        console.error(err);
        res.send(`
            ?????? ???????????? ??? '??????' ??????! <br>
            ?????? ????????? ?????? ????????? ???????????? ??????????????? ???????????????!
        `);
        return;
    }
}

module.exports = {
    handler,
    renderChall,
    renderChallByType,
    renderPost,
    confirmFlag,
    readSolver,
    downloader,
    filehandler,
};