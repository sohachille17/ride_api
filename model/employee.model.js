class Employee
{
    constructor(id, name, position, department){
        this.id = id;
        this.name = name;
        this.position = position
        this.department = department
    }

}

const employeeList = [ ]
module.exports = { Employee, employeeList}