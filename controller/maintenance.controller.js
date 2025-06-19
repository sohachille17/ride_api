const { ticketList, Maintenance, maintenaceList } = require('../model/maintenance.model')
const { rideList } = require('../model/ride.model');
const { employeeList } = require('../model/employee.model');


exports.postAMaintenance = (req, res) => {

    let maintenance = req.body;

    if(maintenance.id == ''.trim() || maintenance.rideId == ''.trim() || maintenance.employeeId == ''.trim() || maintenance.date == ''.trim() ||maintenance.description == ''.trim() ||maintenance.status == ''.trim())
    {
         
        return res.status(404).json(
            {
                message:   `The required atributes are empty`,
                satus : 404
            }
        )
    }
    /* Verification of maintenance if the m exist */

    let getOneRide = rideList.find(ride => ride.id == req.body.rideId)
    if(!getOneRide){
        res.status(404).
            json({
            message : `Sorry but the ride with id ${req.body.rideId} does not exist`,
            status: 404
        })
    }
    let getOnEmployee = employeeList.find(employee => employee.id == req.body.employeeId)
    if(!getOnEmployee){
        res.status(404).
            json({
            message : `Sorry but the employee with id ${req.body.employeeId} do not exist`,
            status: 404
        })
    }
    if(req.body.status !== 'scheduled'.trim() && req.body.status !== 'progress'.trim() && req.body.status !== 'completed'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['scheduled','progress','completed']", status: 422})
    }



        let date = new Date(req.body.date).toString()
        
        if(getOnEmployee != null && getOneRide != null)
        {
            const newMaintenance = new Maintenance(
                id = maintenaceList.length + 1,
                req.body.rideId,
                req.body.employeeId,
                date,
                req.body.description,
                req.body.status
              
                
            )

            // create new Ticket here
            maintenaceList.push(newMaintenance);
            res.status(200).json(
                {
                    message: 'New maintenance created successfully',
                    data: newMaintenance,
                    status: 200
                }
            )

        }

  




}

exports.getAllMaintenance = (req, res) => {

    return res.status(200).json({
        mesage: "Data loaded successfully",
        totalMaintenance: maintenaceList.length,
        data : maintenaceList,
        
    });
  

}




exports.getMaintenanceById = (req, res) => {


    try{

        let getOneMaintenance = maintenaceList.find(maintenance => maintenance.id == req.params.id)

        if(!getOneMaintenance){ res.status(404).
            json({
            message : `Sorry but the maintenance with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneMaintenance.id == req.params.id){

         return res.status(200).json({
            maintenanceId : getOneMaintenance.id,
            ticketDate : getOneMaintenance,
            status: 200
         }) 
    }

    }catch(e){
        console.log(e.message )
    }
   


       
}

exports.deleteMaintenanceById = ( req, res) => {

        let getOneMaintenance = maintenaceList.find(maintenance => maintenance.id == req.params.id)

        if(!getOneMaintenance){ res.status(404).
            json({
            message : `Sorry but the maintenance with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneMaintenance){
        maintenaceList.splice(req.params.id - 1, 1)
        res.status(200).json({message : 'Maintenance deleted successfully!!'})
    }
}




exports.updateMaintenanceById = (req, res) => {

        let getOneMaintenance = maintenaceList.find(maintenance => maintenance.id == req.params.id)

        if(!getOneMaintenance){ res.status(404).
            json({
            message : `Sorry but the maintenance with id ${req.params.id} do not exist`,
            status: 404
        })}

        /* Verification of m if the maintenance exist */


    let getOneRide = rideList.find(ride => ride.id == req.body.rideId)
    if(!getOneRide){
        res.status(404).
            json({
            message : `Sorry but the ride with id ${req.body.rideId} does not exist`,
            status: 404
        })
    }
    let getOnEmployee = employeeList.find(employee => employee.id == req.body.employeeId)
    if(!getOnEmployee){
        res.status(404).
            json({
            message : `Sorry but the employee with id ${req.body.employeeId} do not exist`,
            status: 404
        })
    }
    if(req.body.status !== 'scheduled'.trim() && req.body.status !== 'progress'.trim() && req.body.status !== 'completed'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['scheduled','progress','completed']", status: 422})
    }


   
        let date = new Date(req.body.date).toString()



        maintenaceList[req.params.id - 1].rideId = req.body.rideId;
        maintenaceList[req.params.id - 1].employeeId = req.body.employeeId;
        maintenaceList[req.params.id - 1].date = date
        maintenaceList[req.params.id - 1].description = req.body.description;
        maintenaceList[req.params.id - 1].status = req.body.status;
        
    

   

    res.status(200).json({
        message: `Maintenance with id ${req.params.id} updated successfully`,
        data: getOneMaintenance,
        status: 200
    })

}