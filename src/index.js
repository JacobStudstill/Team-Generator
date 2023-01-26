//Require inquirer
const inquirer = require("inquirer");
const fs = require("fs");

//Import the lib javascripts to be used
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

//Prompt for the employee

const employeeInquiry = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Name of Employee: ",
        },
        {
            type: "input",
            name: "id",
            message: "Employee ID #: ",
        },
        {
            type: "input",
            name: "email",
            message: "Email for Employee: ",
        },
        {
            type: "list",
            name: "role",
            message: "Employee's role: ",
            choices: ["Manager", "Engineer", "Intern"],
        },
    ])
};

//Get the office number for the manager
const managerInquiry = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "officeNumber",
            message: "Manager's office #: ",
        }
    ])
};

//Get school for intern
const internInquiry = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "Intern's School: "
        }
    ])
};

//Get github for engineer
const engineerInquiry = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Github Username for Engineer: ",
        }
    ])
};

//Confirm if there is another team member to add or not
const addEmployee = () => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "addEmployee",
            message: "Would you like to add more team members?"
        }
    ])
}

