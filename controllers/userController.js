const userModel = require('../models/userModel');

exports.CreateUser = async function(req, res){
    const {username, email, password} = req.body;
    const confirmPassword = req.body.confirmPassword;

    const newUser = {
        username,
        email,
        password
    };


    const user = await userModel.getUserByUsername(username);   //Get user by username
    if(user)
        return res.render('register', {
            message: username + " is already existed"
            });
    

    if(!isConfirmPassWord(password, confirmPassword))
    {
        return res.render('register', {
            message: "Confirm password is wrong"
        });
    }

    console.log('userController checked');

    try{
        await userModel.createUser(newUser).then(() =>{
            res.redirect('/users/login');
        });

    }
    catch (err) {
        res.render('register', {
            title: "Register",
            err: "You can't create an account right now. Try again later"
        });
    
        return;
    }

    
}

function isConfirmPassWord(pass, cpass)
{
    if(pass === cpass)
        return true;
    return false;
}


