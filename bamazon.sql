DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR (50) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DECIMAL (8, 2) NOT NULL,
    stock_quantity INTEGER (10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ticket to Ride", "Toys and Games", 39.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Exploding Kittens", "Toys and Games", 19.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rising Sun", "Toys and Games", 79.99, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cricut", "Arts and Crafts", 229.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cutting Mats", "Arts and Crafts", 9.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cricut Tools", "Arts and Crafts", 54.69, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Razer Huntsman Elite Keyboard", "Electronics", 182.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LG 27in 4k Monitor", "Electronics", 399.99, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mario Maker 2", "Video Games", 59.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Smash Bros", "Video Games", 49.99, 9);