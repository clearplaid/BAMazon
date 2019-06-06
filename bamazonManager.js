// Challenge #2: Manager View (Next Level)

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

// Add to Inventory
function addToInventory() {
    // display a prompt that will let the manager "add more" of any item currently in the store
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the products, prompt the mgr for which they'd like to add
        inquirer
          .prompt([
            {
              name: "product",
              type: "rawlist",
              choices: function() {
                var productArray = [];
                for (let i = 0; i < results.length; i++) {
                  productArray.push(results[i].product_name);
                }
                return productArray;
              },
              message: "What product would you like to update?"
            },
            {
              name: "quantity",
              type: "input",
              message: "How many would you like to add?"
            }
          ])
          .then(function(answer) {
            // get the information of the chosen item
            var updateItem = [];
            for (let i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    updateItem.push(results[i]);
                }
            }
            
            var newQuantity = updateItem[0].stock_quantity += parseInt(answer.quantity);
            
            connection.query(
            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: newQuantity
                },
                {
                    item_id: updateItem[0].item_id
                }
            ],
            function(error) {
                if (error) throw err;

                console.log("Inventory updated successfully!");
                startMenu();
            }
            );
        })
    })
}

// Add New Product
function addNewProduct() {
    // allow the manager to add a completely new product to the store
    inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Add Product Name"
      },
      {
        name: "department",
        type: "input",
        message: "Add Department"
      },
      {
        name: "price",
        type: "input",
        message: "Add Price",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "Add Quantity",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new product into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;

          console.log("Your product was added successfully!");
          startMenu();
        }
      );
    });
}

