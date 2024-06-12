const express = require('express');
const router = express.Router();
const path = require('path');


// regex to make the route work with only /  or only index or index.html in url
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views',  'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views',  'new-page.html'));
});

router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page');
});


module.exports = router;