# BAMazon
Node.js and MySQL store front.

This app will take in orders from customers and deplete stock from the store's inventory. As a bonus, this program can track product sales across the store's departments and then provide a summary of the highest-grossing departments in the store.

## Challenge #1: Customer View

Created a MySQL Database called bamazon.

Then created a Table inside of that database called products.

The products table has each of the following columns:

item_id (unique id for each product)

product_name (Name of product)

department_name

price (cost to customer)

stock_quantity (how much of the product is available in stores)

Populated database with around 10 different products. (i.e. Inserted "mock" data rows into this database and table).

Then created a Node application called bamazonCustomer.js. Running this application will first display all of the items available for sale. Including the ids, names, and prices of products for sale.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcCustomerDisplay.PNG" alt="customer display" style="width:200px;"/>

The app then prompts users with two messages.

The first asks them for the product they would like to buy.
The second message asks how many units of the product they would like to buy.
Once the customer has placed the order, the application checks if the store has enough of the product to meet the customer's request.

If not, the app logs "Insufficient quantity!", and then prevents the order from going through.
However, if the store has enough of the product, it fulfills the customer's order.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcCustomerInsufficient.PNG" alt="insufficient quantity" style="width:200px;"/>


This means it updates the SQL database to reflect the remaining quantity.
Once the update goes through, the customer is given the total cost of their purchase.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcCustomerPurchase.PNG" alt="customer purchase" style="width:200px;"/>


## Challenge #2: Manager View 

Created a Node application called bamazonManager.js. Running this application does the following:

Listed a set of menu options:

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bManagerMenu.PNG" alt="manager menu" style="width:200px;"/>

Products for Sale

Low Inventory

Add Inventory

Add New Product

If a manager selects Products for Sale, the app lists every available item: the item IDs, names, prices, and quantities.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bManagerProducts.PNG" alt="products for sale" style="width:200px;"/>

If a manager selects Low Inventory, then it lists all items with an inventory count lower than five.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bManagerLowInv.PNG" alt="low inventory" style="width:200px;"/>

If a manager selects Add Inventory, the app displays a prompt that will let the manager "add more" of any item currently in the store.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bManagerAddInv.PNG" alt="add inventory" style="width:200px;"/>

If a manager selects Add New Product, it allows the manager to add a completely new product to the store.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bManagerAddProd.PNG" alt="add new product" style="width:200px;"/>


## Challenge #3: Supervisor View

Created a new MySQL table called departments. This table includes the following columns:

department_id

department_name

over_head_costs (A dummy number you set for each department)

Modified the products table so that there's a product_sales column, and modified bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.


Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcSupervisorMenu.PNG" alt="supervisor menu" style="width:200px;"/>

Product Sales by Department

When a supervisor selects Product Sales by Department, the app displays a summarized table in their terminal/bash window.

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcSupervisorDeptSales.PNG" alt="department sales" style="width:200px;"/>

The total_profit column is calculated on the fly using the difference between over_head_costs and product_sales. total_profit is not stored in any database.

Create New Department

<img src="https://github.com/clearplaid/BAMazon/blob/master/screenshots/bcSupervisorCreate.PNG" alt="create department" style="width:200px;"/>


