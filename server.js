// Grabs inquirer and mysql2 packages to use within file
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Connect to database using mysql
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // Add password, if no password, leave empty
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);