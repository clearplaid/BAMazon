// Challenge #3: Supervisor View (Final Level)
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
    supervisorMenu();

});
// List a set of menu options:
function supervisorMenu (){
    inquirer.prompt({
        name: "selection",
        type: "list",
        message: "Make a selection:",
        choices: ["Department Product Sales", "Create New Department", "Exit"]
    }).then(function(answer) {
        
            switch(answer.selection) {
                case 'Department Product Sales':
                productSalesByDept();
                break;

                case 'Create New Department':
                createDepartment();
                break;  
              
                default:
                console.log("Exiting program");
                connection.end();
            }              
    })
}

// View Product Sales by Department
function productSalesByDept () {
     // The total_profit column is calculated on the fly using the difference between over_head_costs and product_sale
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) AS product_sales, sum(products.product_sales) - departments.over_head_costs AS total_profit ";query += "FROM departments ";
    query += "LEFT JOIN products ";
    query += "ON bamazon_db.products.department_name = bamazon_db.departments.department_name ";
    query += "GROUP BY bamazon_db.departments.department_name ";
    query += "ORDER BY department_id";

    connection.query(query, function(err, results) {
        if (err) throw err;
        // When a supervisor selects View Product Sales by Department, displays a summarized table in their terminal/bash window
        console.table(results);
        supervisorMenu();
    })
   
}
// Create New Department
function createDepartment() {
        // allow the supervisor to add a completely new department to the store
        inquirer
        .prompt([
          {
            name: "department",
            type: "input",
            message: "Add Department Name"
          },
          {
            name: "overhead",
            type: "input",
            message: "Add Overhead Costs",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
        ])
        .then(function(answer) {
          // when finished prompting, insert a new department into the db with that info
          connection.query(
            "INSERT INTO departments SET ?",
            {
              department_name: answer.department,
              over_head_costs: answer.overhead,
            },
            function(err) {
              if (err) throw err;
    
              console.log("The department was added successfully!");
              supervisorMenu();
            }
          );
        });
    }