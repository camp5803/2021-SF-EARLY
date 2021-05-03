const express = require('express');
const router = express.Router();
const multer = require('multer');

const isAdmin = require('../lib/users/admin').isAdmin;
const Authorization = require('../lib/aaa').authorization;
const adminRender = require('../lib/users/admin').readAdminPage;
const delData = require('../lib/admin/delete');
const modData = require('../lib/admin/update');
const renderer = require('../lib/admin/render');
const dataSwtich = require('../lib/admin/onoff');
const noticeHandler = require('../lib/boards/notice').handler;
const challHandler = require('../lib/boards/chall').handler;
const { redirectNotice } = require('../lib/boards/notice');
const { filehandler } = require('../lib/boards/chall');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'fileupload/');
    },
}); 

const upload = multer({ storage }); 

router.use(Authorization);
router.use(isAdmin);

router.get('/notice', renderer.noticeRender);
router.get('/chall', renderer.challRender);
router.get('/', adminRender);
router.get('/chall_post', renderer.challAdder);
router.get('/notice_post', renderer.noticeAdder);
router.get('/log', renderer.logRender);
router.get('/log/download/:filename', renderer.logDownloader);

router.get('/modify/user/:uuid', renderer.modUserRender);
router.get('/modify/chall/:puid', renderer.modChallRender);
router.get('/modify/notice/:nuid', renderer.modNoticeRender);
router.get('/delete/user/:uuid', delData.userHandler);
router.get('/delete/chall/:puid', delData.challHandler);
router.get('/delete/notice/:nuid', delData.noticeHandler);

router.get('/banuser/:uuid', dataSwtich.banUser);
router.get('/unbanuser/:uuid', dataSwtich.unbanUser);
router.get('/chall/turnon/:puid', dataSwtich.turnOnChall);
router.get('/chall/turnoff/:puid', dataSwtich.turnOffChall);

router.post('/modify/user/:uuid', modData.userHandler);
router.post('/modify/chall/:puid', modData.challHandler);
router.post('/modify/notice/:nuid', modData.noticeHandler);

router.post('/notice_post', Authorization, noticeHandler, renderer.redirectNotice);
router.post('/chall_post', Authorization, challHandler, renderer.redirectChall);
router.post('/chall_fileupload', Authorization, upload.single('challfile'), filehandler, renderer.redirectChall);


module.exports = router;