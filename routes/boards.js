const express = require('express');
const router = express.Router();

const Authorization = require('../lib/aaa').authorization;
const etcRender = require('../lib/boards/etc');
const noticeRender = require('../lib/boards/notice').renderNotice;
const noticePostReader = require('../lib/boards/notice').renderPost;
const challRender = require('../lib/boards/chall').renderChall
const challPostReader = require('../lib/boards/chall').renderPost;
const challConfirmFlag = require('../lib/boards/chall').confirmFlag;
const challReadSolver = require('../lib/boards/chall').readSolver;
const challRenderByType = require('../lib/boards/chall').renderChallByType;
const challDownloader = require('../lib/boards/chall').downloader;

router.use(Authorization);

router.get('/ranking', etcRender.rank);
router.get('/ranking/:type', etcRender.rankByType);

router.get('/notice', noticeRender);
router.get('/notice/:id', noticePostReader);

router.get('/chall', challRender);
router.get('/chall/:type', challRenderByType);
router.get('/chall/detail/:id', challPostReader);
router.post('/chall/detail/:id/download', challDownloader);

router.post('/chall/submit', challReadSolver, challConfirmFlag);

module.exports = router;