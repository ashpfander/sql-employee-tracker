# Challenge 12: MySQL Employee Tracker
![License badge](https://img.shields.io/badge/license-MIT_License-blue)

## Description

For this project, we had to create an employee MySQL database from scratch and prompt certain options for a user to choose from. I started out with creating the database within a schema file and connecting certain areas within the tables. Then added a seeds file to have some starting information within the database to make sure everything works. We then had to utilize Inquirer to prompt options for a user to do different things with the departments, roles, and employees. Here were the User Story and Acceptance Criteria.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Walkthrough Video
[MySQL Employee Tracker Walkthrough Video]()

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Questions](#questions)

## Installation

Once this repo has been cloned to your local system and opened in VS Code, you will need to install inquirer and mysql2. In your terminal, run `npm i` and it will install the necessary packages.

## Usage

In the server.js file, update the user and password within the mysql connection if necessary. Once that's been updated, run `npm start` to start the database connection.

## Contributing

N/A

## Tests

N/A

## License
MIT License

---

## Questions

Any questions you may have, please feel free to reach out to me using either contact.<br>
GitHub Profile: https://github.com/ashpfander<br>
Email: ashmpfander@gmail.com