const express = require("express");
const router = express.Router();
const { 
    postEmployee, 
    getAllEmployee, 
    getEmployeeById, 
    deleteEmployeeById, updateEmployeeById } = require('../controller/employee.controller')

router
.route('/')
.get(getAllEmployee)
.post(postEmployee);

router
.route('/:id')
.get(getEmployeeById)
.delete(deleteEmployeeById)
.put(updateEmployeeById);

module.exports = router;