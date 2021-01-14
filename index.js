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

//Routing
//app.use('/', require('./routes/indexRouter'));
// app.use('/category', require('./routes/productRouter'));
// //Routing
app.use('/', require('./routes/productRouter'));

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

//LOGIN PART. USING 'PASSPORT' MIDDLEWARE

//0. Initialize
//const passport = require('./util/passport');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userModel = require('./models/userModel');
const userMongooseModel = require('./models/userModel_Mongoose');
const flash = require('connect-flash');
const bodyParser = require('body-parser');

app.use(passport.initialize());
app.use(flash());

const session = require('express-session');
//và khai báo sử dụng:
app.use(session({
    secret: "cats",
    cookie: {
        maxAge: 1000 * 50 * 5 //đơn vị là milisecond
    },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.session());



//module.exports = passport;
//1. Define the strategy

  passport.use(new LocalStrategy(
    async function (username, password, done) {
      console.log("Entering LocalStrategy");
      const user = await userModel.checkCredential(username, password);
      if (!user) {
        console.log("Login failed");
        return done(null, false, { message: 'Incorrect username or password. ' });
      }
      console.log("Login success");
      return done(null, user);
    }
  ));

  //2. (I will move all of this to passport.js later on)
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  //HANGING
  passport.deserializeUser(function(id, done) {
    userModel.getUserById(id).then((user) => {
        done(null, user);
    });
          
  });


//3. Add routing /users/login
//use this to parse req body to get information
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json()); //To get username and pass for authen strategy
app.use(bodyParser.urlencoded({extended: true}));


app.use('/users', require('./routes/userRouter'));

const bcrypt = require('bcrypt');
app.post('/users/login', 

   passport.authenticate('local',  { successRedirect: '/users/register', failureRedirect: '/category'})
  //   ,(req, res) => {
  //     console.log("Calling Auth Method");}
     );


const userController = require('./controllers/userController');
app.post('/users/register', userController.CreateUser);




//Initialize the server part
app.set('port', process.env.PORT || 5000);
app. listen(app.get('port'), () => {
    console.log(`Server is running at port ${app.get('port')}`);
});