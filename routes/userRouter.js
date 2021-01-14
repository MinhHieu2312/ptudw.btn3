const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login'); //Pour this 'index' hbs file into {{{body}}} in 'layout.hbs'
});

router.get('/register', (req, res) => {
    res.render('register'); //Pour this 'index' hbs file into {{{body}}} in 'layout.hbs'
});


module.exports = router;