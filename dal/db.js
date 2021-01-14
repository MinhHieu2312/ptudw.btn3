const mongoose = require('mongoose');
const uri = 'mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/sbookshop';

async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('Connect successful!');
    } catch (error) {
        console.log('Connect fail!');
    }
}

module.exports = { connect };


// const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/test';

// const client = new MongoClient(uri, { useUnifiedTopology: true });

// let database;

// async function connectDb(){
//     try{
//     await client.connect();
    
//     database = await client.db('sbookshop');
//     console.log('Db connected!');
//     }
//     catch(err)
//     {
//         console.log(err);
//     }
// }

// console.log('RUNNING DB...');

// connectDb();

// //Set a name for the db()
// const db = () => database;

// module.exports.db = db;


// const insertDocuments = function(db, user, callback) {
//     // Get the documents collection
//     const collection = db.collection('users');
    

//     //Insert ONE document
//     collection.insertOne({user.name: "noel vui ve"}, function(err, result) {
//         console.log("Inserted ONE document into the collection");
//         callback(result);
//         });
//   }