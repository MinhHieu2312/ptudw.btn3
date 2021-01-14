const bcrypt = require("bcrypt"); //Lib for hashing password
var nodemailer = require("nodemailer");
const userModel = require("../models/Service/userModel");
const users = require("../models/users");

const saltRounds = 10;



const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "sbookshop.noreply@gmail.com",
        pass: "Ptudw123.",
    },
    tls:{
        rejectUnauthorized: false,
    }
});
var RandReset,mailOptions,Host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


//app.get('/send',
module.exports.sendMail = async (mailOptions) => {
    await smtpTransport.sendMail(mailOptions);
 }

exports.index = async (req, res, next) => {
    res.render('forgotPassword');
}

exports.SendResetPasswordMail = async function(req,res){

        //Find the user's email
        const user = await userModel.getUserByUsername(req.body.username);
        //Create a mail    
        RandReset=Math.floor((Math.random() * 100) + 54);

        Host=req.get('host');

        link="http://"+req.get('host')+"/users/resetPassword?id="+RandReset+"&username="+req.body.username;

        mailOptions = {
            from: '"SBookshop 📚" <sbookshop.noreply@gmail.com>',
            to: user.email,
            subject: "PTUDW_K18: Request to reset password",
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            link +
            '\nIf you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        console.log(mailOptions);
        await smtpTransport.sendMail(mailOptions);

        return res.render('login', {message: "An email has been sent to your account's email. Please check it!"});
}

var usernameToReset, idToReset;    //Save this for resetPassword view

exports.resetPasswordView = async function(req,res){
    usernameToReset = req.query.username;
    idToReset = req.query.id;
    return res.render('resetPassword');
}

exports.resetPasswordHandler = async function(req,res){

    console.log(req.protocol+"://"+req.get('Host'));
    if((req.protocol+"://"+req.get('Host'))==("http://"+Host))
    {

        console.log("Domain is matched. Information is from Authentic email");
        if(idToReset==RandReset)
        {   
            console.log(req.body.password);
            console.log(req.body.confirmPassword);

            //Check matching pass and confirmPass
            if(req.body.password != req.body.confirmPassword)
            {
                return res.render('resetPassword', {message: "Password is not matching. Please retry!"});
            }

            //Have to hash before update to database
            
                const hash = await bcrypt.hash(req.body.password, saltRounds);
                await users.updateOne({username: usernameToReset}, {password: hash});
                console.log("Password is reset");
                return res.render('login', {message: "Account "+  usernameToReset +" has successfully reset the password"});
        }
        else
        {
            console.log("Password is NOT reset");
            return res.render('login', {message: "Account "+  usernameToReset +" has NOT reset the password"});
        }
    }

    return res.render('login', {message:"<h1>Request is from unknown source"});

}

/*--------------------Routing Over----------------------------*/