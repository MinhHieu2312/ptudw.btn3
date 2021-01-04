const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL. This is where your mongodb server is running.
var url = "mongodb+srv://sbookshop:ptudw123@cluster0.em6hz.mongodb.net/test";


// Database Name
const dbName = 'sbookshop';

let database;


// Use connect method to connect to the server
MongoClient.connect(url, { useUnifiedTopology: true }, function(err, client) {
  assert.strictEqual(null, err);
  console.log("Database Connected!");

  database = client.db(dbName);
});

//Set a name for the db()
const db = () => database;

module.exports.db = db;



//CRUD part
/*
//   insertDocuments(db, function() {
//     client.close();
//   });

// removeDocuments(db, function() {
//     findDocuments(db, function() {
//         client.close();
//       });
//   });

    var result;

  findDocuments(db, function(res) {
      //result = res;
    client.close();
  });

  


//   updateDocument(db, function() {
//     client.close();
//   });

});


const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('gamers');
    
    console.log(collection.countDocuments(function(err, result) {
        console.log("haha count: ");
        console.log(result);
        callback(result);
    }));

    // // Insert some documents
    // collection.insertMany([
    //   {name: "Hoang"}, {name: "Huy"}, {name: "anh Hoang dep trai"}
    // ], function(err, result) {
    //   console.log("Inserted 3 documents into the collection");
    //   callback(result);
    // });

    //Insert ONE document
    collection.insertOne({name: "noel vui ve"}, function(err, result) {
        console.log("Inserted ONE fuckin document into the collection");
        callback(result);
        });


    console.log(collection.countDocuments(function(err, result) {
        console.log("haha count later: ");
        console.log(result);
        callback(result);
    }));
  }


const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('gamers');
    // Find some documents
    collection.find({name: "Hoang"}).toArray(function(err, docs) {
        assert.strictEqual(err, null);
        console.log("Tìm thấy chừng này nè");
        console.log(docs);
         var result = Object (docs);
         var words = String(result[0]).split(',');
         console.log(words[0]);
        
        
        callback(docs);
    });
}

const updateDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('gamers');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a : 2 }
      , { $set: { age : 8 } }, function(err, result) {
        assert.strictEqual(err, null);

      console.log("Update thành công!!!!!");
      callback(result);
    });
  }

  const removeDocument = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Delete document where a is 3
    collection.deleteOne({ a : 3 }, function(err, result) {
      assert.strictEqual(err, null);

      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });
  }

const removeDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('gamers');
    // Delete document where a is 3
    collection.deleteMany({a:3}, function(err, result) {
        assert.strictEqual(err, null);
        console.log("Removed ALLLLLL documents có a = 3");
        callback(result);
    });
}
*/