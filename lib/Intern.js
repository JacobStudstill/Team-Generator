//Import the Employee class
const Employee = require('./employee');

//Intern class will extend our employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        //Super the employee information 
        super(name, id, email);
        this.school = school;
    }
    //Get the school for the intern
    getSchool() {
        return this.school;
    }
    //Get the role for intern
    getRole() {
        return 'Intern'
    }
}

//Export to be used by other pages
module.exports = Intern;