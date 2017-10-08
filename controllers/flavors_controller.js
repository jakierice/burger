const express = require('express');

const router = express.Router();

// Import the model (flavor.js) to use its database functions.
const flavor = require('../models/flavor');

// Create all our routes and set up logic within those routes where required.
router.get('/', (req, res) => {
	flavor.all((data) => {
		var hbsObject = {
			title: 'In the Freezer',
			flavors: data
		};
		res.render('index', hbsObject);
	});
});

router.get('/tasted', (req, res) => {
	flavor.all((data) => {
		var hbsObject = {
			title: 'Already Tasted',
			flavors: data
		};
		res.render('tasted', hbsObject);
	});
});

router.get('/need_to_buy', (req, res) => {
	flavor.all((data) => {
		var hbsObject = {
			title: 'Need to Buy',
			flavors: data
		};
		res.render('needToBuy', hbsObject);
	});
});

router.post('/', (req, res) => {
	flavor.create([
		'flavor_name',
		'retailer_name'
	], [
			req.body.name,
			req.body.retailer
		], () => {
			res.redirect('/');
		});
});

router.put('/:id', (req, res) => {
	var condition = `id = ${req.params.id}`;

	flavor.update({
		tasted: req.body.tasted
	}, condition, () => {
		res.redirect('/');
	});
});

router.put('/personal_stock/:id', (req, res) => {
	var condition = `id = ${req.params.id}`;

	flavor.update({
		personal_stock: req.body.personalStock
	}, condition, () => {
		res.redirect('/');
	});
});

// Export routes for server.js to use.
module.exports = router;
