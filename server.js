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
            const sql = `SELECT * FROM department
            ORDER BY department_id`;
  
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
        else if (answer.options === 'View all Roles') {
            const sql = `SELECT r.title, r.role_id, d.department_name, r.salary
            FROM role r
            INNER JOIN department d ON r.department_id=d.department_id
            ORDER BY r.role_id`;
  
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('Viewing all Roles');
                    console.table(result);
                    // Re-prompts the other options
                    promptOptions();
                }
            });
        }
        else if (answer.options === 'View all Employees') {
            const sql = `SELECT e.employee_id, e.first_name, e.last_name, r.title, d.department_name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name
            FROM employee e
            INNER JOIN role r ON e.role_id=r.role_id
            INNER JOIN department d ON r.department_id=d.department_id
            LEFT JOIN employee m ON e.manager_id=m.employee_id
            ORDER BY e.employee_id`;
  
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    console.log('Viewing all Employees');
                    console.table(result);
                    // Re-prompts the other options
                    promptOptions();
                }
            });
        }
        else if (answer.options === 'Add a Department') {
            inquirer.prompt(
                {
                    type: 'input',
                    message: 'What is the department name?',
                    name: 'department'
                }
            )
            .then((answer) => {
                const sql = `INSERT INTO department (department_name)
                VALUES ("${answer.department}")`;
  
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log('Department has been added');
                        // Re-prompts the other options
                        promptOptions();
                    }
                });
            })
        }
        else if (answer.options === 'Add a Role') {
            // Queries the database for the department names
            db.query('SELECT department_id, department_name FROM department', (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }
                
                const departmentChoices = results.map(row => ({ name: row.department_name, value: row.department_id }));

                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is the role?',
                        name: 'role'
                    },
                    {
                        type: 'input',
                        message: 'What is the salary for this role?',
                        name: 'salary'
                    },
                    {
                        type: 'list',
                        message: 'What department does this role belong to?',
                        name: 'department',
                        choices: departmentChoices
                    }
                ])
                .then((answer) => {
                    // Adds new role into the role table with corresponding values
                    const sql = `INSERT INTO role (title, salary, department_id)
                    VALUES ("${answer.role}", ${answer.salary}, ${answer.department})`;
  
                    db.query(sql, (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('Role has been added');
                            // Re-prompts the other options
                            promptOptions();
                        }
                    });
                })
            })
        }
        else if (answer.options === 'Add an Employee') {
            // Queries the database for the roles
            db.query(`SELECT r.role_id, r.title AS role, e.first_name, e.last_name, e.employee_id
            FROM role r
            INNER JOIN employee e ON r.role_id = e.role_id`, (err, results) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const roleChoices = results.map(row => ({ name: row.role, value: row.role_id }));
                const managerChoices = results.map(row => ({ name: `${row.first_name} ${row.last_name}`, value: row.employee_id }));

                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'What is their first name?',
                        name: 'first_name'
                    },
                    {
                        type: 'input',
                        message: 'What is their last name?',
                        name: 'last_name'
                    },
                    {
                        type: 'list',
                        message: 'What is their role?',
                        name: 'role',
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        message: 'Do they have a manager?',
                        name: 'manager',
                        choices: [...managerChoices, 'NULL']
                    }
                ])
                .then((answer) => {
                    // Adds new role into the role table with corresponding values
                    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES ("${answer.first_name}", "${answer.last_name}", ${answer.role}, ${answer.manager})`;
  
                    db.query(sql, (err, result) => {
                        if (err) {
                            console.log(err);
                            return;
                        } else {
                            console.log('Employee has been added');
                            // Re-prompts the other options
                            promptOptions();
                        }
                    });
                })
            })
        }
    })
}

promptOptions();