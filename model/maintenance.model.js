class Maintenance
{
    constructor(id, rideId, employeeId, date, description, status){

        this.id = id;
        this.rideId = rideId;
        this.employeeId = employeeId;
        this.date = date;
        this.description = description;
        this.status = status;
    }


    
}

const maintenaceList = []

module.exports = { Maintenance, maintenaceList}