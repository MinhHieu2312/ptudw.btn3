let express = require ('express');
let app = express();

//Set Public Static Folder
app.use(express.static(__dirname + '/public'));

//Using HANDLEBAR component
let helper = require ('./controllers/helper');
let paginateHelper = require('express-handlebars-paginate');
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname +'/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers :{
      createPagination: helper.createPagination
  }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//Include database into the project
const db = require('./dal/db');
db.connect();


// //Routing
app.use('/', require('./routes/productRouter'));

// app.get('/:page', (req, res) => {
//     let banners = {
//         blog:'Our Blog',
//         category: 'Shop Category',
//         cart: 'Our Cart',
//         checkout: 'Product Checkout',
//         confirmation: 'Order Confirmation',
//         contact: 'Contact Us',
//         login: 'Login / Register',
//         register: 'Register',
//         single_blog: 'Blog Details',
//         tracking_order: 'Order Tracking'
//     };

//     let page = req.params.page;
//     res.render(page, {banner: banners[page]});
// });

//LOGIN PART. USING 'PASSPORT' MIDDLEWARE
const passport = require('./util/passport');

const flash = require('connect-flash');
const bodyParser = require('body-parser');

app.use(passport.initialize());
app.use(flash());

const session = require('express-session');
app.use(session({
    secret: "cats",
    cookie: {
        maxAge: 1000 * 50 * 5 
    },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isLoggedIn = req.user ? true : false;
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', require('./routes/userRouter'));
app.post('/users/login', passport.Authenticate);

const userController = require('./controllers/userController');
app.post('/users/register', userController.CreateUser);

//Logout using passport function
app.get('/users/logout', passport.LogoutHandler);

//Verify account
const mailConfirm = require('./util/mailConfirm');
app.get('/verify', mailConfirm.Verify);

//Initialize the server part
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});