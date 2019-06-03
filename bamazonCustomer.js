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
    displayProducts();

});

// display all of the items available for sale. Include the ids, names, and prices of products for sale.
function displayProducts() {
    connection.query("SELECT * FROM products",function(err, res){
        if (err) throw err;
        console.table(res);
        purchasePrompt();
    })
}

// The app should then prompt users with two messages.
function purchasePrompt(){
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    inquirer.prompt ([
    {
        // ask them the ID of the product they would like to buy.
        name: "choice",
        type: "rawlist",
        choices: function () {
            var productArray = [];
            for (var i = 0; i < results.length; i++) {
                productArray.push(results[i].product_name);
            }
            return productArray;
        },
        message: "What is the product you would like to purchase?"
    },
    {
       // ask how many units of the product they would like to buy.
        name: "quantity",
        type: "input",
        message: "How many would you like to purchase?" 
    }
    ]).then(function(answer){
        console.log("answer: " + JSON.stringify(answer));
        // get selected product info
        console.log("results: " + JSON.stringify(results));
        var chosenProduct;
        for (let i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              chosenProduct = results[i];
            }
        };
        console.log("Chosen Product: " + JSON.stringify(chosenProduct));
        // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        if (chosenProduct[4] < parseInt(answer.quantity)) {
            // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
            
            console.log("Insufficient Quantity")
            displayProducts();
        }
        // However, if your store does have enough of the product, you should fulfill the customer's order.

        else {
            connection.query(
                // updating the SQL database to reflect the remaining quantity.
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: chosenProduct.stock_quantity -= answer.quantity
                    },
                    {
                        item_id: chosenProduct.item_id
                    }
                ],
                function(error) {
                    if (error) throw err;
                    // Once the update goes through, show the customer the total cost of their purchase.
                    purchaseTotal = chosenProduct.price *= parseInt(answer.quantity)
                    console.log("Purchase Total = " + purchaseTotal);
                    displayProducts();
                });
            }
        });
    })


}
