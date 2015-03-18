/**
 * chenmm
 * 2014/11/21
 * common routes
 */

module.exports = function (app) {

    app.get('/testIndex', function(req,res){
        res.render("common/totalIndex");
    });

    app.get('/index', function(req,res){
        res.render("common/index");
    });

    app.get('/indexPart', function(req,res){
        res.render("common/indexPart");
    });

	app.get('/adminIndexPart', function(req,res){
		res.render("admin/adminIndexPart");
	});

	app.get('/adminIndex', function(req,res){
		res.render("admin/adminIndex");
	});
};