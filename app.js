const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
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

start

