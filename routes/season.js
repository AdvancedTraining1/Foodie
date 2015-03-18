var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/season', function(req, res) {
  res.render('season/season');
});

router.get('/season_an', function(req, res) {
	res.render("common/index");
});


module.exports = router;
