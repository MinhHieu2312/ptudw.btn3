let express = require ('express');
let app = express();

//Set Public Static Folder
app.use(express.static(__dirname + '/public'));

//Using HANDLEBAR component
let expressHbs = require('express-handlebars');
let helper = require ('./controllers/helper');
let paginateHelper = require('express-handlebars-paginate');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname +'/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers :{
        createPagination: paginateHelper.createPagination
    }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Middleware parse req.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Include database into the project
const db = require('./dal/db');
db.connect();
//Routing
app.use(require('./routes/productRouter'));

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
        tracking_order: 'Order Tracking'
    };
    let page = req.params.page;
    res.render(page, {banner: banners[page]});
});

app.set('port', process.env.PORT || 5000);
app. listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});