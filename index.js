let express = require ('express');
let app = express();

//Set Public Static Folder
app.use(express.static(__dirname + '/public'));

//Using HANDLEBAR component
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname +'/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Include database into the project
const db = require('./dal/db_NoAsync');

//Routing
app.use('/', require('./routes/indexRouter'));
app.use('/category', require('./routes/productRouter'));

app.get('/:page', (req, res) => {
    let banners = {
        blog:'Our Blog',
        category: 'Shop Category',
        cart: 'Our Cart',
        checkout: 'Product Checkout',
        confirmation: 'Order Confirmation',
        contact: 'Contact Us',
        login: 'Login / Register',
        register: 'Register',
        single_blog: 'Blog Details',
        tracking_order: 'Order Tracking'
    };

    let page = req.params.page;
    res.render(page, {banner: banners[page]});
});


//Initialize the server part
app.set('port', process.env.PORT || 5000);
app. listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});