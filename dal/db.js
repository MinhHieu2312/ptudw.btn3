const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/test';

const client = new MongoClient(uri, { useUnifiedTopology: true });

let database;

async function connectDb(){
    await client.connect();
    
    database = await client.db('sbookshop');
    console.log('Db connected!');
}

console.log('RUNNING DB...');

connectDb();

//Set a name for the db()
const db = () => database;

module.exports.db = db;