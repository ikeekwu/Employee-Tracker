DROP DATABASE IF EXISTS emp_db;

CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department (
	id INT AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE emp_role (
    id INT AUTO_INCREMENT,
    title VARCHAR(45),
    salary DECIMAL(12),
    department_id INT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
    
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES emp_role(id)
);

INSERT INTO department (name)
VALUES ("Sales"), ("Finance"),("Engineer"),("Legal") ;



SELECT * FROM department;
