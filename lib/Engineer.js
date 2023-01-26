//Import the Employee class

const Employee = require('./Employee');

//Engineer class will extend our employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        //Super the employee information 
        super(name, id, email);
        this.github = github;
    }

    //Function to get the github of the engineer
    getGithub() {
        return this.github;
    }

    //Return engineer role
    getRole() {
        return 'Engineer'
    }
}

//Export to be used by other pages
module.exports = Engineer;