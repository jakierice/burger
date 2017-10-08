DROP DATABASE IF EXISTS flavors_db;

CREATE DATABASE flavors_db;

USE flavors_db;

DROP TABLE IF EXISTS flavors;

CREATE TABLE flavors (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
	flavor_name VARCHAR(100) NOT NULL,
	personal_stock BOOLEAN NOT NULL DEFAULT false,
	tasted BOOLEAN NOT NULL DEFAULT false,
	rating INTEGER(2),
	retailer_name VARCHAR(11),
	date TIMESTAMP,
	PRIMARY KEY(id)
);