//Create a class for the employee
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    //Function to get back the name
    getName() {
        return this.name;
    }

    //Function to get back the id
    getId() {
        return this.id;
    }

    //Function to get back the email
    getEmail() {
        return this.email;
    }

    //Function to get role of employee
    getRole() {
        return 'Employee';
    }
}

//Export to be used by other pages
module.exports = Employee;