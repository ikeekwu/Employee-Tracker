const mysql = require("mysql");
const chalk = require("chalk");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Twerkortreat",
    database: "emp_db",
    
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(chalk.blue('Connection made!'))
});


const viewDept = () =>{
    connection.query("SELECT * FROM department", (err, rows) => {
        if (err) throw err;
        rows.forEach(rows => console.log(`${rows.id,rows.name}`))
    });
}

const addDept = (dept) => {
    dept = {name: ""};

    connection.query("INSERT INTO department SET ?", dept, (err,res) => {
        if (err) throw err;

        console.log("Last Insert ID:", res.insertID);
    });
};

const addRoles = () => {
    connection.query("INSERT INTO emp_role (first_name, role) ?")
}


console.log(addDept(), viewDept())


module.exports = {
    viewDept: viewDept,
}