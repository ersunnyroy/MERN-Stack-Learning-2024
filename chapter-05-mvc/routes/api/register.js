const express = require('express');
const router = express.Router();
const registerController = require('../../controllers/registerController.js');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .post(registerController.handleNewUser);

module.exports = router;