const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    console.log('model db');
    const booksCollection = db().collection('products');
    const category = await booksCollection.find({}).toArray();
    console.dir(category);
    return category;
}

exports.get = async (_id) => {
    const booksCollection = db().collection('products');
    const detail = await booksCollection.findOne({_id: ObjectId(_id)})
    return detail;
}