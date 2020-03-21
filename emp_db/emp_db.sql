DROP DATABASE IF EXISTS emp_db;

CREATE DATABASE emp_db;

USE emp_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE emp_role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(45) NULL,
    salary DECIMAL(12) NULL,
    department_id INT NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUE (Sales);

INSERT INTO department (name)
VALUE (Legal);

INSERT INTO department (name)
VALUE (Finance);

INSERT INTO department (name)
VALUE (Engineering);


