//Import the Employee class
const Employee = require('./employee');

//Manager will extend the employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        //Super the object data from employee
        super(name, id, email);
        //Office number 
        this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
    getRole() {
        return 'Manager'
    }
}
//Export to be used by other pages
module.exports = Manager;