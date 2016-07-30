
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS places;


CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(90),
	password VARCHAR(200),
	fName VARCHAR(100),
	lName VARCHAR(100),
	timestamp INT(15),
	PRIMARY KEY (id)
);

CREATE TABLE places (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) DEFAULT NULL,
	category VARCHAR(30) DEFAULT NULL,
	lat FLOAT( 10 ) NOT NULL,
	lng FLOAT( 10 ) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE comments (
	id INT NOT NULL AUTO_INCREMENT,
	text VARCHAR(2000),
	timestamp INT(15),
	comment_author INT(10),
	place_id INT(15),
	PRIMARY KEY (id),
	FOREIGN KEY (comment_author) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE ratings (
	id INT NOT NULL AUTO_INCREMENT,
	rating INT(5),
	type VARCHAR(200),
	user_id INT(10),
	timestamp INT(15),
	place_id INT(15),
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
	FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);

CREATE TABLE toilets (
	id INT NOT NULL AUTO_INCREMENT,
	sharpsdisposal BOOLEAN,
	drinkingwater BOOLEAN,
	showers BOOLEAN,
	babychange BOOLEAN,
	parkingaccessible BOOLEAN,
	accessibleunisex BOOLEAN,
	accessiblefemale BOOLEAN,
	accessiblemale BOOLEAN,
	parking BOOLEAN,
	keyrequired BOOLEAN,
	paymentrequired BOOLEAN,
	accesslimited BOOLEAN,
	unisex BOOLEAN,
	female BOOLEAN,
	male BOOLEAN,
	postcode INT(4),
	state VARCHAR(30),
	town VARCHAR(100),
	address1 VARCHAR(200),
	place_id INT(15),
	PRIMARY KEY (id),
	FOREIGN KEY (place_id) REFERENCES places(id) ON DELETE CASCADE
);







