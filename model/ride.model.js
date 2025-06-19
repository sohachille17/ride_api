class Ride {
    constructor(id, name, capacity, minHeight, duration, status){
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.minHeight = minHeight;
        this.duration = duration;
        this.status = status;
    }
}

const rideList = [ ];
module.exports = { Ride , rideList} ;