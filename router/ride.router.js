const express = require("express");
const router = express.Router();
const { 
    postRide, 
    getAllRide, 
    getRideById, 
    deleteRoteById, updateRideById } = require('../controller/ride.controller')

router
.route('/')
.get(getAllRide)
.post(postRide);

router
.route('/:id')
.get(getRideById)
.delete(deleteRoteById)
.put(updateRideById);

module.exports = router;