const { Ticket, ticketList } = require('../model/ticket.model')
const { visitorList } = require("../model/visitor.model")


exports.postATicket = (req, res) => {

    let ticket = req.body;

    if(ticket.id == ''.trim() || ticket.visitorId == ''.trim() || ticket.type == ''.trim() || ticket.price == ''.trim() ||ticket.purchaseDate == ''.trim() ||ticket.validUntil == ''.trim())
    {
         
        return res.status(404).json(
            {
                message:   `The required atributes are empty`,
                satus : 404
            }
        )
    }
    /* Verification of visitors if the visitor exist */

    let getOneVisitor = visitorList.find(visitor => visitor.id == req.body.visitorId)
    if(!getOneVisitor){
        res.status(404).
            json({
            message : `Sorry but the visitor with id ${req.body.visitorId} does not exist`,
            status: 404
        })
    }
    if(req.body.type !== 'day'.trim() && req.body.type !== 'season'.trim() && req.body.type !== 'vip'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['day','season','vip']", status: 422})
    }

    try
    {

        let purchaseDate = new Date(req.body.purchaseDate).toString()
        let validUntil = new Date(req.body.validUntil).toString();
        if(getOneVisitor)
        {
            const newTicket = new Ticket(
                id = ticketList.length + 1,
                req.body.visitorId,
                req.body.type,
                req.body.price,
                purchaseDate,
                validUntil
                
            )

            // create new Ticket here
            ticketList.push(newTicket);
            res.status(200).json(
                {
                    message: 'New ticket created successfully',
                    data: newTicket,
                    status: 200
                }
            )

        }

    }catch(e)
    {
        if(e.message == 'Invalid Date'){
            res.status(422).json({
                message: 'Invalid date format check date format and try again'
            })
        }

    }




}

exports.getAllTicket = (req, res) => {

    return res.status(200).json({
        mesage: "Data loaded successfully",
        totalTicket: ticketList.length,
        data : ticketList,
        
    });
  

}




exports.getTicketById = (req, res) => {


    try{

        let getOneTicket = ticketList.find(ticket => ticket.id == req.params.id)

        if(!getOneTicket){ res.status(404).
            json({
            message : `Sorry but the ticket with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneTicket.id == req.params.id){

         return res.status(200).json({
            ticketId : getOneTicket.id,
            ticketDate : getOneTicket,
            status: 200
         }) 
    }

    }catch(e){
        console.log(e.message )
    }
   


       
}

exports.deleteTicketById = ( req, res) => {

        let getOneTicket = ticketList.find(ticket => ticket.id == req.params.id)

        if(!getOneTicket){ res.status(404).
            json({
            message : `Sorry but the ticket with id ${req.params.id} do not exist`,
            status: 404
        })}

    if(getOneTicket){
        ticketList.splice(req.params.id - 1, 1)
        res.status(200).json({message : 'Ticket deleted successfully!!'})
    }
}




exports.updateTicketById = (req, res) => {

    let getOneTicket = ticketList.find(ticket => ticket.id == req.params.id)

    if(!getOneTicket){ res.status(404).
        json({
        message : `Sorry but the ticket with id ${req.params.id} do not exist`,
        status: 404
    })}

        /* Verification of visitors if the visitor exist */

    let getOneVisitor = visitorList.find(visitor => visitor.id == req.body.visitorId)
    if(!getOneVisitor){
        res.status(404).
            json({
            message : `Sorry but the visitor with id ${req.body.visitorId} does not exist`,
            status: 404
        })
    }


    if(req.body.type !== 'day'.trim() && req.body.type !== 'season'.trim() && req.body.type !== 'vip'.trim())
    {
    return res.status(422).json({message: "Status should  either be ['day','season','vip']", status: 422})
    }
    if(getOneTicket)
    {
        let purchaseDate = new Date(req.body.purchaseDate).toString()
        let validUntil = new Date(req.body.validUntil).toString();


        ticketList[req.params.id - 1].name = req.body.name;
        ticketList[req.params.id - 1].visitorId = req.body.visitorId;
        ticketList[req.params.id - 1].type = req.body.type;
        ticketList[req.params.id - 1].price = req.body.price;
        ticketList[req.params.id - 1].purchaseDate = purchaseDate;
        ticketList[req.params.id - 1].validUntil = validUntil;
    }

   

    res.status(200).json({
        message: `Ticket with id ${req.params.id} updated successfully`,
        data: getOneTicket,
        status: 200
    })

}