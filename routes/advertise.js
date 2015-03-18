/**
 * this is edited by huhao
 * 2014.10,28
 * use for admin to choose right page
 */
var express = require('express');
var router = express.Router();
var advertiseHandler = require('../controller/advertiseHandler');

/* GET admin page. */
router.get('/addAd', function(req, res) {
    res.render('advertise', { title: '管理员' });
});

/*
对广告的操作
* */
router.post('/addAd',advertiseHandler.addAd);
router.get('/getAllAds',advertiseHandler.getAllAds);
router.post('/delete',advertiseHandler.deleteAd);
//router.post('/getUserById',advertiseHandler.getUserById);
router.post('/updateUser',advertiseHandler.updateAd);


module.exports = router;
