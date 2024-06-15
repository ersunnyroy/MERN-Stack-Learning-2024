const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .post(authController.handleLogin);

module.exports = router;