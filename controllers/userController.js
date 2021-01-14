const userModel = require('../models/Service/userModel');
const confirmMail = require('../util/mailConfirm');

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
            confirmMail.SendConfirmMail(req, res);
            res.render('login', {message: "An verification email has been sent to " + email + " to activate your new account"});
        });

    }
    catch (err) {
        res.render('register', {
            message: err
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


