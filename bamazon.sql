-- Create a MySQL Database called bamazon.
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

-- Then create a Table inside of that database called products.
CREATE TABLE products (
    -- item_id (unique id for each product)
    item_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    -- product_name (Name of product)
    product_name VARCHAR (50) NOT NULL,
    -- department_name
    department_name VARCHAR (30) NOT NULL,
    -- price (cost to customer)
    price DECIMAL (8, 2) NOT NULL,
    -- stock_quantity (how much of the product is available in stores)
    stock_quantity INTEGER (10),

    PRIMARY KEY (item_id)
);
ALTER TABLE products
ADD COLUMN product_sales DECIMAL (12, 2) AFTER price; 

-- Create a new MySQL table called departments. Your table should include the following columns:
CREATE TABLE departments (
    -- department_id
    department_id INTEGER (11) AUTO_INCREMENT NOT NULL,
    -- department_name
    department_name VARCHAR (50) NOT NULL,
    -- over_head_costs (A dummy number you set for each department)
    over_head_costs DECIMAL (8, 2) NOT NULL,
    PRIMARY KEY (department_id)
);

ALTER TABLE departments AUTO_INCREMENT=100;

-- Populate this table with around 10 different products. 
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


-- Populate department table with departments from previous table. 
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys and Games", 2000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Arts and Crafts", 1000.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Video Games", 900.00);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 10500.00);

