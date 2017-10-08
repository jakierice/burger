const orm = require('./../config/orm');

var flavor = {
	all: (callback) => {
		orm.all('flavors', (res) => {
			callback(res);
		});
	},
	findBy: (col, val, callback) => {
		orm.findBy('flavors', val, (res) => {
			callback(res);
		});
	},
	// The variables cols and vals are arrays.
	create: (cols, vals, callback) => {
		orm.create('flavors', cols, vals, (res) => {
			callback(res);
		});
	},
	update: (objColVals, condition, callback) => {
		orm.update('flavors', objColVals, condition, (res) => {
			callback(res);
		});
	}
};

module.exports = flavor;