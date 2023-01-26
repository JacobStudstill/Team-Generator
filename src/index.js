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
const addAnother = () => {
    return inquirer.prompt([
        {
            type: "confirm",
            name: "addAnother",
            message: "Would you like to add more team members?"
        }
    ])
}

let staffArray = [];

//Async function to get all the information , put it in the staff array, and display the inputted information on the page
async function assembleTeam() {
    const promise = new Promise((resolve, reject) => {
        employeeInquiry()
        .then(function({ name, id, email, role }) {

            //Do this if the role is manager
            if(role === "Manager") {
                managerInquiry().then(function({ officeNumber }) {
                    this.employee = new Manager(name, id, email, officeNumber, role);
                    //Push to our staff array
                    staffArray.push(employee);
                    addAnother()
                    //Run the function again from the beginning if add another is true
                    .then(({ addAnother }) => {
                        if(addAnother === true) {
                            assembleTeam();
                        } else {
                            resolve("complete")
                        }
                    })
                });

            //Do this if the role is Engineer
            } else if (role === "Engineer") {
                engineerInquiry().then(function({ github }) {
                    this.employee = new Engineer(name, id, email, github, role);
                    //Push to our staff array
                    staffArray.push(employee);
                    addAnother()
                    //Run the function again from the beginning if add another is true
                    .then(({ addAnother }) => {
                        if(addAnother === true) {
                            assembleTeam();
                        } else {
                            resolve("complete");
                        }
                    })
                });   
            

            } else if (role === "Intern") {
                internInquiry().then(function({ school }) {
                    this.employee = new Intern(name, id, email, school, role);
                    //Push to our staff array
                    staffArray.push(employee);
                    addAnother()
                    //Run the function again from the beginning if add another is true
                    .then(({ addAnother }) => {
                        if(addAnother === true) {
                            assembleTeam();
                        } else {
                            resolve("complete")
                        }
                    })
                });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    const result = await promise;

    
    function employeeAdditions(employee) {
        if(employee.getRole() === "Manager") {
            return `Office number: ${employee.officeNumber}`;
        }

        if(employee.getRole() === "Engineer") {
            return `GitHub: <a href="https://github.com/${employee.github}" target="#">${employee.github}</a>`;
        }

        if(employee.getRole() === "Intern") {
            return `School: ${employee.school}`;
        }
    }

    
}

assembleTeam();