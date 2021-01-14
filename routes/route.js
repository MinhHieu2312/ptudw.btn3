const express = require('express');

const router = express.Router();


//4. Define routes here
// router.get('/:page', (req, res, next) => {
//     const page = req.params.page;
//     res.render(page);
// });

router.get('/', (req, res) => {
    res.render('index'); //Pour this 'index' hbs file into {{{body}}} in 'layout.hbs'
});

router.get('/blog', (req, res) => {
    res.render('blog');
});


module.exports = router;