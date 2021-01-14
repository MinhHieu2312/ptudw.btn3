const bcrypt = require("bcrypt"); //Lib for hashing password

const db = require('../dal/db');
const userMongooseModel = require('./userModel_Mongoose');

exports.createUser = async (newUser) => {
    //Add user into database
    const saltRounds = 10;

    await bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            let user = new userMongooseModel({
                username: newUser.username,
                email: newUser.email,
                password: hash,     //THIS IS THE POINT OF USING BCRYPT
                status: "ACTIVE",
                name: "Update Later",
                phone: "Update Later",
                createdAt: "2020-12-29T10:26:06.073+00:00",
                updatedAt: "2020-12-29T10:26:06.073+00:00"
            });

            user.save();
            console.log("A new user created");
        });
    });
}

//Function to check validity of user
//HANGING
exports.checkCredential = async (username, password) =>{
    console.log("Checking credential...");
    const user = await userMongooseModel.findOne({username: username});   //Get user by username
    if(!user)
        return false;
    let checkPassword = await bcrypt.compare(password, user.password);
    if(checkPassword){
        console.log("Credential Success");
        return user;
    }
    console.log("Credential Failed");
    return false;
}

//HANGING
exports.getUserById = (id) => {
    return userMongooseModel.findOne({_id: id});
}