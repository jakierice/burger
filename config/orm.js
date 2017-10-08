// Import MySQL connection.
const connection = require('../config/connection');

var printQuestionMarks = (num) => {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push('?');
	};

	return arr.toString();
};

// Helper function to convert object key/value pairs to SQL syntax
var objToSql = (ob) => {
	var arr = [];

	// loop through the keys and push the key/value as a string int arr
	for (var key in ob) {
		var value = ob[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(ob, key)) {

			if (typeof value === 'string' && value.indexOf(' ') >= 0) {
				value = "'" + value + "'";
			}
			arr.push(`${key} = ${value}`);
		}
	}

	// translate array of strings to a single comma-separated string
	return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
	all: (tableInput, callback) => {
		var queryString = `SELECT * FROM ${tableInput}`;
		
		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},
	findBy: (table, col, val, callback) => {
		var queryString = `SELECT * FROM ${table} WHERE ${col} = ${val}`;

		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},
	create: (table, cols, vals, callback) => {
		var queryString = `INSERT INTO ${table} (${cols.toString()})
								VALUE (${printQuestionMarks(vals.length)})`

		connection.query(queryString, vals, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	},

	update: (table, objColVals, condition, callback) => {
		var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`

		connection.query(queryString, (err, result) => {
			if (err) throw err;

			callback(result);
		});
	}
};

module.exports = orm;
