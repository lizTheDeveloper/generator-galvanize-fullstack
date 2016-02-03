var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
	knex.select().table('authors').then(function(authors) {
		res.json(authors);
	});
});

router.get('/:id', function(req, res, next) {
	knex.select().table('authors').where({id: req.params.id}).then(function(authors) {
		res.json(authors);
	});
});

router.post('/', function(req, res, next) {
	knex('authors').insert(req.body).then(function(insert) {
		knex.select().table('authors').then(function(authors) {
			res.json(authors);
		});
	});
});

router.put("/:id", function(req, res, next) {
	knex('authors').update(req.body).where({"id" : req.params.id}).then(function(insert) {
		knex.select().table('authors').then(function(authors) {
			res.json(authors);
		});
	});
}).delete(function(req, res, next) {
	knex('authors').where({"id":req.params.id}).del();
});

module.exports = router;
