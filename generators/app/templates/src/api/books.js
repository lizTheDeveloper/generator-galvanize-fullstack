var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
	knex.select().table('books').then(function(books) {
		res.json(books);
	});
});

router.get('/:id', function(req, res, next) {
	knex.select().table('books').where({id: req.params.id}).then(function(books) {
		res.json(books);
	});
});

router.post('/', function(req, res, next) {
	knex('books').insert(req.body).then(function(insert) {
		knex.select().table('books').then(function(books) {
			res.json(books);
		});
	});
});

router.put("/:id", function(req, res, next) {
	knex('books').update(req.body).where({"id" : req.params.id}).then(function(insert) {
		knex.select().table('books').then(function(books) {
			res.json(books);
		});
	});
}).delete(function(req, res, next) {
	knex('books').where({"id":req.params.id}).del();
});

module.exports = router;
