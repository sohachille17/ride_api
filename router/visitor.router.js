const express = require("express");
const router = express.Router();
const { 
    postVisitor, 
    getAllVisitors, 
    getvisitorById, 
    deleteVisitorById, updateVisitorById } = require('../controller/visitor.controller')

router
.route('/')
.get(getAllVisitors)
.post(postVisitor);

router
.route('/:id')
.get(getvisitorById)
.delete(deleteVisitorById)
.put(updateVisitorById);

module.exports = router;