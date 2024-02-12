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

// Generates starter options to choose from
function promptOptions() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'options',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Exit']
        }
    )
    .then((answer) => {
        // Generates different instances based on which option the user chooses
        if (answer.options === 'View all Departments') {
            const sql = `SELECT * FROM department`;
  
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('Viewing all Departments');
                    console.table(result);
                    // Re-prompts the other options
                    promptOptions();
                }
            });
        }
    })
}

promptOptions();