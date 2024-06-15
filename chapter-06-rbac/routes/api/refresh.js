const express = require('express');
const router = express.Router();
const refreshController = require('../../controllers/refreshController');

// handling all the route by route() on place of get post put delete or patch 
router.route('/')
    .get(refreshController.handleRefreshToken);

module.exports = router;