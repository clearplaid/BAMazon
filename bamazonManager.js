// Challenge #2: Manager View (Next Level)
// Node application called bamazonManager.js. Running this application will:
const inquirer = require ("inquirer");
const mysql = require ("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("id: " + connection.threadId);
    startMenu();

});
// List a set of menu options:
function startMenu (){
    inquirer.prompt({
        name: "selection",
        type: "list",
        message: "Make a selection:",
        choices: ["Products for Sale", "Low Inventory", "Add Inventory", "Add New Product", "Exit"]
    }).then(function(answer) {
        console.log("Manager Selection: " + JSON.stringify(answer));
        
            switch(answer.selection) {
                case 'Products for Sale':
                viewProducts();
                break;

                case 'Low Inventory':
                viewLowInventory();
                break;  
                
                case 'Add Inventory':
                addToInventory();
                break;

                case 'Add New Product':
                addNewProduct();
                break;

                default:
                console.log("Exiting program");
                connection.end();
            }
                
    })
}

// View Products for Sale
function viewProducts () {
    // list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.table(results);
        startMenu();
    })
}

// View Low Inventory
function viewLowInventory() {
    // list all items with an inventory count lower than five
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        var lowInventory = [];
        for (let i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                lowInventory.push("Product: " + results[i].product_name + " Quantity: " + results[i].stock_quantity);
            }
        }  
        console.log(lowInventory);
        startMenu();
    })
};

// // Add to Inventory
// function addToInventory() {
//     // display a prompt that will let the manager "add more" of any item currently in the store

// };

// // Add New Product
// function addNewProduct() {
//     // allow the manager to add a completely new product to the store

// };
