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
        log.logger_flag(req, `\n${req.session.users.nickname}님이 ${req.session.challid}번 문제에 플래그 ${req.body.prob_flag}로 인증 실패함`);
        res.render('flag', { 
            err: true, 
            msg: req.body.prob_flag, 
            link: '../chall', 
            route: '../'
        });
    } else {
        log.logger_flag(req, `\n${req.session.users.nickname}님이 ${req.session.challid}번 문제에 플래그 ${req.body.prob_flag}로 인증 성공함`);
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
        log.logger_flag(req, `\n${req.session.users.nickname}님이 이미 인증한 ${req.session.challid}번 문제에 플래그 ${req.body.prob_flag}로 인증 시도함`);
        res.render('error', { route: '../', link: '../chall' }); // 인증 불가능 상태
        return;
    } else {
        next(); // 인증 하러 가야함
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
            log.logger_download(req, `\n${req.session.users.nickname}님이 ${req.params.id}번 문제의 파일 ${filedata[0].originalname}을 다운로드함`)
            const mimetype = filedata[0].mimetype
            res.setHeader('Content-Disposition', 'attachment; filename=' + filedata[0].filename + extension);
            res.setHeader('Content-Type', mimetype);
            const filestream = fs.createReadStream(file);
            filestream.pipe(res);
            //res.redirect(`/chall/${req.params.id}`);
        } else {
            res.send(`
                파일 다운로드 중 '탐색' 오류! <br>
                오류 종류와 문제 이름을 포함하여 운영진에게 연락주세요!
            `);
            return;
        }
    } catch(err) {
        console.error(err);
        res.send(`
            파일 다운로드 중 '서버' 오류! <br>
            오류 종류와 문제 이름을 포함하여 운영진에게 연락주세요!
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