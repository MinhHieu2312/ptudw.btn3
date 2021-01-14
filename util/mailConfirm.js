var express=require('express');
var nodemailer = require("nodemailer");
const users = require("../models/users");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var xoauth2 = require('xoauth2');

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
var Rand,mailOptions,Host,link;
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/


//app.get('/send',
module.exports.sendMail = async (mailOptions) => {
    await smtpTransport.sendMail(mailOptions);
 }

exports.SendConfirmMail = async function(req,res){

        Rand=Math.floor((Math.random() * 100) + 54);

        Host=req.get('host');

        link="http://"+req.get('host')+"/verify?id="+Rand+"&username="+req.body.username;

        mailOptions = {
            from: '"SBookshop 📚" <sbookshop.noreply@gmail.com>',
            to: req.body.email,
            subject: "PTUDW_K18: Please confirm your Email account",
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            link +
            ' If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };

        console.log(mailOptions);
        await smtpTransport.sendMail(mailOptions);
}



exports.Verify = async function(req,res){
    console.log(req.protocol+":/"+req.get('Host'));
    if((req.protocol+"://"+req.get('Host'))==("http://"+Host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==Rand)
        {
            await users.updateOne({username: req.query.username}, {status: "ACTIVE"});
            console.log("Account is verified. Please login in");
            return res.render('login', {message: "Account "+  req.query.username +" is been successfully verified"});
        }
        else
        {
            console.log("Email is not verified");
            return res.render('login', {message: "Account "+  req.query.username +" is NOT verified"});
        }
    }
    else
    {
        return res.render('login', {message:"<h1>Request is from unknown source"});
    }
}

/*--------------------Routing Over----------------------------*/