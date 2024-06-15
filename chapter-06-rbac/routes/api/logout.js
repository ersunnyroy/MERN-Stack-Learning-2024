const express = require('express');
const router = express.Router();
const logoutController = require('../../controllers/logoutController');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .get(logoutController.handleLogout);

module.exports = router;