const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

exports.list = async () => {
    console.log('model db');
    const productcollection = db().collection('products');
    const category = await productcollection.find({}).toArray();
    console.dir(category);
    return category;
}

exports.get = async(id) => {
    const productcollection = db().collection('products');
    const detail = await productcollection.findOne({_id: ObjectId(id)});
    return detail;
}