const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

exports.list = async () => {
    console.log('model db');
    const bookCollection = db().collection('products');
    const category = await bookCollection.find({}).toArray();
    console.dir(category);
    return category;
}

exports.get = async (_id) => {
    const bookCollection = db().collection('products');
    const category = await bookCollection.findOne({_id: ObjectId(_id)})
    return category;
}
