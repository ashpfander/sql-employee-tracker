-- Pre-populated info for the different tables
INSERT INTO department (department_name)
VALUES ("Design"),
       ("Customer Service"),
       ("Marketing"),
       ("IT"),
       ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Graphic Designer", 80000, 1),
       ("Customer Relations Manager", 60000, 2),
       ("Director of Marketing", 90000, 3),
       ("Software Engineer", 100000, 4),
       ("Accountant", 80000, 5),
       ("Financial Planner", 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Beverly", "Barnet", 2, NULL),
       ("Vinny", "Clemente", 3, NULL),
       ("Daria", "Hodges", 4, NULL),
       ("Clifton", "Boyce", 6, NULL),
       ("Reign", "Elwes", 1, 3),
       ("Edith", "O'Keefe", 5, 6);