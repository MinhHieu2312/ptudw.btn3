const userModel = require('../models/userModel');

exports.CreateUser = async function(req, res){
    const {username, email, password} = req.body;
    const confirmPassword = req.body.confirmPassword;

    const newUser = {
        username,
        email,
        password
    };

    console.log('userController checked');

    try{
        await userModel.createUser(newUser).then(() =>{
            res.redirect('/users/login');
        });

    }
    catch (err) {
        res.render('users/register', {
            title: "Register",
            err: "You can't create an account right now. Try again later"
        });
    
        return;
    }

    
}




