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
                    var employee = new Manager(name, id, email, officeNumber, role);
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
                    var employee = new Engineer(name, id, email, github, role);
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
                    var employee = new Intern(name, id, email, school, role);
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

    function htmlCards() {
        let html = "";
        for(var i = 0; i < staffArray.length; i++) {
            html += `<div class="card bg-dark text-light justify-content-center align-items-center" style="width: 18rem;">
            <div class="col card-header">
                <h4>${staffArray[i].name}</h4>
            </div>
            <div class="col card-header">
                <h4>${staffArray[i].getRole()}</h4 >
            </div >
            <ul class="list-group list-group-flush bg-info text-dark text">
                <li class="list-group-item">ID: ${staffArray[i].id}</li>
                <li class="list-group-item">Email: <a href="mailto:${staffArray[i].email}">${staffArray[i].email}</a></li>
                <li class="list-group-item"> ${employeeAdditions(staffArray[i])}</li>
            </ul>
        </div > `
        }
        return html;
    }

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <title>Team Generator</title>

    </head>
        <body>
            <nav class="navbar navbar-dark bg-info justify-content-center align-items-center">
                <span class="navbar-brand mb-0 h1">
                    <h1>My Team members</h1>
                </span>
            </nav>
            <div class="row">
                ${htmlCards()}
            </div>
        </body>
    </html>`

    fs.writeFile("./dist/myteam.html", html, function(err) {
        if(err) throw err;
        console.log("Your file has been created successfully!");
    });
}

assembleTeam();