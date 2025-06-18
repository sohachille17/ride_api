const express = require("express");
const router = express.Router();
const { 
    getAllTicket,
    postATicket, 
    getTicketById , 
    deleteTicketById,
    updateTicketById
    
} = require('../controller/ticket.controller')

router
.route("/")
.get(getAllTicket)
.post(postATicket);

 router.route('/:id')
 .get(getTicketById)
 .delete(deleteTicketById)
 .put(updateTicketById)



module.exports = router;