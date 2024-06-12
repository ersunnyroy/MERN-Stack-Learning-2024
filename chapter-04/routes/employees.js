const express = require('express');
const router = express.Router();
const path = require('path');

const data = {};

data.employees = require('../public/data/employees.json');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname,
        })
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id,
        })
    });

// routing with parameters
router.route('/:id')
    .get((req, res) => {
        res.json({
            "id": req.params.id
        })
    })

module.exports = router;