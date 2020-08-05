const mysql = require('mysql');
const inquirer = require('inquirer');

const chalk = require('chalk')
const emp_functions = require("./emp_fucntions")

// Initialize connection to mySQL database

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    database:"emp_db",
    password: "Twerkortreat"
});

connection.connect(function(err){
    if (err) throw err;
    console.log(chalk.blue('Connection made!'))
});



// Inquirer prompts

const start = () => {

    // Initial prompt for starting menu.
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Exit"
            ]
        })
        .then(function(response){
            if (response.action === "View all departments") {
                emp_functions.viewDepts();
            } else if (response.action === "View all roles") {
                emp_functions.viewRoles();
            } else if (response.action === "View all employees") {
                emp_functions.viewEmployees();
            } else if (response.action === "Add department") {
                emp_functions.addDept();
            } else if (response.action === "Add role") {
                emp_functions.addRoles();
            } else if (response.action === "Add employee") {
                emp_functions.addEmployee();
            } else if (response.action === "Update Roles") {
                updateRole();
            } else if (response.action === "Exit") {
                connection.end();
            }
        })
}

start();