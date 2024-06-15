const express = require('express');
const router = express.Router();
const employeeController = require('../../controllers/employeeController');
const verifyJWT = require('../../middleware/verifyJWT');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);

// routing with parameters
router.route('/:id')
    .get(employeeController.getEmployee)

module.exports = router;