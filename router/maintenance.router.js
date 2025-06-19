const express = require("express");
const router = express.Router();
const { 
    postAMaintenance, 
    getAllMaintenance, 
    getMaintenanceById, 
    deleteMaintenanceById, updateMaintenanceById } = require('../controller/maintenance.controller')

router
.route('/')
.get(getAllMaintenance)
.post(postAMaintenance);

router
.route('/:id')
.get(getMaintenanceById)
.delete(deleteMaintenanceById)
.put(updateMaintenanceById);

module.exports = router;