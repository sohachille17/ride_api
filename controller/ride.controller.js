
const { Ride } = require('../model/ride.model');
const { simpleData } = require ('../data/simpleData');
const rideList = [ ];
rideList.push(simpleData);


exports.updateRideById = (req, res) => {

    let getOneRide = rideList.find(user => user.id == req.params.id)
    if(!getOneRide){
        res.status(404).
            json({
            message : `Sorry but the ride with id ${req.params.id} do not exist`,
            status: 404
        })
    }
    if(req.body.status !== 'operational'.trim() && req.body.status !== 'maintenance'.trim() && req.body.status !== 'closed'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['operational','maintenance','closed']", status: 422})
    }
    if(getOneRide)
    {
        rideList[req.params.id - 1].name = req.body.name;
        rideList[req.params.id - 1].capacity = req.body.capacity;
        rideList[req.params.id - 1].minHeight = req.body.minHeight;
        rideList[req.params.id - 1].duration = req.body.duration;
        rideList[req.params.id - 1].status = req.body.status;
    }

   

    res.status(200).json({
        message: `Ride with id ${req.params.id} updated successfully`,
        data: getOneRide,
        status: 200
    })

}
exports.deleteRoteById = ( req, res) => {

     let getOneRide = rideList.find(user => user.id == req.params.id)
     if(!getOneRide) { 
        res.status(404).
            json({
            message : `Sorry but the ride with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneRide){
        rideList.splice(req.params.id - 1, 1)
        res.status(200).json({message : 'Ride deleted successfully!!'})
    }
}

exports.getAllRide = (req, res) => {

    return res.status(200).json({
        mesage: "Data loaded successfully",
        totalRides: rideList.length,
        data : rideList,
        
    });
  

}

exports.getRideById = (req, res) => {


    try{

        let getOneRide = rideList.find(user => user.id == req.params.id)

        if(!getOneRide){ res.status(404).
            json({
            message : `Sorry but the ride with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneRide.id == req.params.id){

         return res.status(200).json({
            userId : getOneRide.id,
            userData : getOneRide,
            status: 200
         }) 
    }

    }catch(e){
        console.log(e.message )
    }
   


       
}
exports.postRide = (req,res) => {

    let ride = req.body;

    if(ride.id == ''.trim() || ride.name == ''.trim() || ride.capacity == ''.trim() || ride.minHeight == ''.trim() ||ride.duration == ''.trim() ||ride.status == ''.trim())
    {
         
        return res.status(404).json(
            {
                message:   `The required atributes are empty ${getCurrent}`,
                satus : 404
            }
        )
    }
    if(ride.status !== 'operational'.trim() && ride.status !== 'maintenance'.trim() && ride.status !== 'closed'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['operational','maintenance','closed']", status: 422})
    }
    // create a new ride here
    const postRide = new Ride(

       ride.id = rideList.length + 1,
       ride.name,
       ride.capacity,
       ride.minHeight,
       ride.duration,
       ride.status

    )
    
    rideList.push(postRide);


    res.status(200).json(
        {
            message:`New ride wih id ${ride.id} was created successfully`,
            data: postRide,
            status: 200
        }
    )
}