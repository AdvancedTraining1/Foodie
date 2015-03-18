var express = require('express');
var router = express.Router();
var saleHandler = require('../controller/saleHandler');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('sale', { pageTitle: '卖东西啦' });
});

router.post('/',function(req, res){
	req.on('data',function(data){
		var obj= JSON.parse(data.toString());
		var str = obj.search + ", u r fooled idiot" ;
		res.send(str);
	});
});

router.get('/createTradePost',function(req,res){
    res.render('sale/createTradePost');
});

router.get('/createTradePost_angular',function(req,res){
    res.render('common/index');
});

router.get('/listTradePost',function(req,res){
    res.render('sale/listTradePost');
});

router.get('/listTradePost_angular',function(req,res){
    res.render('common/index');
});

router.get('/showTradePost',function(req,res){
    res.render('sale/tradePost');
});

router.get('/showTradePost_angular/:saleId',function(req,res){
    res.render('common/index');
});

router.get('/listAll',saleHandler.listAll);
router.get('/getAll',saleHandler.getAll);
router.get('/getOne/:saleId',saleHandler.getOne);
router.get('/getOwn',saleHandler.getOwn);
router.post('/delete',saleHandler.delete);
router.post('/create',saleHandler.create);
router.post('/edit',saleHandler.edit);
router.get('/search',saleHandler.search);
router.get('/showCommentList',saleHandler.getAllSaleComment);
router.get('/checkCollection/:saleId',saleHandler.checkCollection);
router.post('/addSaleComment',saleHandler.createSaleComment);
router.get('/addSaleCollection/:saleId',saleHandler.createSaleCollect);
router.get('/cancelSaleCollection/:saleId',saleHandler.cancelSaleCollection);

module.exports = router;
