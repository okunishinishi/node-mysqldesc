CREATE DATABASE IF NOT EXISTS descmysql_test;
USE descmysql_test;
CREATE TABLE IF NOT EXISTS TEST_SHOP (
    article INT(4) UNSIGNED ZEROFILL DEFAULT '0000' NOT NULL,
    dealer  CHAR(20)                 DEFAULT ''     NOT NULL,
    price   DOUBLE(16,2)             DEFAULT '0.00' NOT NULL,
    PRIMARY KEY(article, dealer)
);

CREATE TABLE IF NOT EXISTS TEST_PERSON
(
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
);
