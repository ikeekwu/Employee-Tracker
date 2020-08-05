const mysql = require("mysql");
const chalk = require("chalk");
const consoleTable = require("console.table");
const init = require("./app");
const inquirer = require("inquirer");


// Makes connection to database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Twerkortreat",
    database: "emp_db",
    
});
//  confirms connection
connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.blue('Connection made!'))
});

// Function for viewing different departments
function viewDepts() {
    connection.query("SELECT * FROM department", function(err,res){
        if (err) throw err;

        console.log("Departments:")
    res.forEach(department => {
        console.log(`ID: ${department.id} | Name: ${department.name}`)
    });
    
    })
};

// Function to view roles created 
function viewRoles(){
    connection.query("SELECT * FROM emp_role", function (err, res) {
        if(err) throw err;

        console.log("Roles:")
        res.forEach(role => {
            console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`)
        });

    })
};

function viewEmployees() {

    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;

        console.log("Employees:")
        res.forEach(employee => {
            console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`)
        })

    })
}

function addDept() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What would you like the department to be?"
        }).then(function(response){

            connection.query("INSERT INTO department (name) VALUES (?)", response.department, function(err, res){
                if(err) throw err;

                console.log("A new department has been added:" + response.department)
            })
            viewDepts();
        })
}

const addRoles = () => {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                name: "title",
                type:"input",
                message: "What role would you like to add?"
            },
            {
                name:"salary",
                type:"input",
                message:"How much is pay?"
            },
            {
                name:"departmentName",
                type: "list",
                message: "What department are they part of?",
                choices: function(){
                    var choicesArr = [];

                    res.forEach(res => {
                        choicesArr.push(res.name);
                    })
                    return choicesArr;
                }
            }
        ])
        .then(function(response){
            connection.query("SELECT * FROM department", function(err, res) {
                if(err) throw err;
                const department = response.departmentName;
                let filtDept = res.filter(function(res) {
                    return res.name == department;
                })

                const id = filtDept[0].id;
                const query = "INSERT INTO emp_role (title, salary, department_id) VALUES (?, ?, ?)";

                let values = [response.title, parseInt(response.salary), id]
                console.log(values);
                    connection.query(query, values, function(err, res, fields) {
                        console.log(`Role added: ${(values[0])}`)
                    })
                    viewRoles();
            })
        })
    })
}


async function addEmployee() {
    connection.query("SELECT * FROM emp_role", function(err, results) {
        if(err) throw err;

        inquirer
            .prompt([{
                name: "firstName",
                type: "input",
                message: "What is their name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is their last name?"
            },
            {
                name: "roleName",
                type: "list",
                message: "What is their role?",
                choices: function() {
                    rolesArr = [];
                        results.forEach(result => {
                            rolesArr.push(
                                result.title
                            )
                        })
                        return rolesArr;
                }
            }
        ])
        .then(function(response) {
            console.log(response);
            const role = response.roleName;

            connection.query("SELECT * FROM emp_role", function(err, res){
                if (err) throw err;
                const filtRole = res.filter(function(res){
                    return res.title == role
                })
                const roleID = filtRole[0].id;
                connection.query("SELECT * FROM employee", function(err, res){
                    if (err) throw err;
                    inquirer
                        .prompt([{
                            name: "manager",
                            type: "list",
                            message: "Who is managing?",
                            choices: function () {
                                managersArr = []
                                res.forEach(res => {
                                    managersArr.push(
                                        res.last_name
                                    )
                                })
                                return managersArr;
                            }
                        }]).then(function (managerRes) {
                            const manager = managerRes.manager;
                            connection.query("SELECT * FROM employee", function (err, res) {
                                if (err) throw err;
                                const filtManager = res.filter(function (res) {
                                    return res.last_name == manager;
                                })

                                let managerID = filtManager[0].id;
                                console.log(managerRes);
                                let query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?)";
                                let value = [answer.first_name, answer.last_name, roleID, managerID]
                                console.log(value)
                                console.query(query, value,
                                    function (err, res, fields) {
                                        if (err) throw err;
                                        console.log(`You have added this employee: ${(value[0])}`)
                                    })
                                viewEmployees();
                            })
                        })
                    
                })
            })
        })
    })
}

function updateRole() {
    connection.query("SELECT * FROM employee", function(err, results){
        if (err) throw err;

        inquirer
            .prompt([
                {
                name: "employeeName",
                type: "list",
                message: "Who's role is changing?",
                choices: function() {
                    employeeArr = [];
                    results.forEach(result => {
                        employeeArr.push(result.last_name)
                    })
                    return employeeArr;
                }
            }
        ])
        .then(function(response) {
            console.log(response);
            const name = response.employeeName;

            connection.query("SELECT * FROM emp_role", function(err, res){
                if (err) throw err;

                inquirer
                .prompt ([
                {
                    name: "role",
                    type: "list",
                    message: "What is the updated role?",
                    choices: function() {
                        rolesArr = [];
                        res.forEach(res => {
                            rolesArr.push(res.title)
                        })
                        return rolesArr;
                    }
                }
            ])
            .then(function(rolesRes){
                const role = rolesRes.role;
                console.log(rolesRes.role);
            connection.query("SELECT * FROM emp_role WHERE title = ?", [role], function(err, res){
                if (err) throw err;

                const roleID = res[0].id;
                let query = "UPDATE employee SET role_id ? WHERE last_name ?";
                let values = [roleID, name]
                console.log(values);
                connection.query(query, values,
                    function(err, res, fields) {
                        console.log(`Employee ${name} has been updated to ${role}`)
                    })
                    viewEmployees();
            })
            })

            })
        })
    })
}

module.exports = {
    viewDepts: viewDepts,
    viewRoles: viewRoles,
    viewEmployees: viewEmployees,
    addRoles: addRoles,
    addDept: addDept,
    addEmployee: addEmployee,
    updateRole: updateRole

}