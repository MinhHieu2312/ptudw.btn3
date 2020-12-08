const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

exports.list = async () => {
    const productcollection = db().collection('products');
    const category = await productcollection.find({}).toArray();
    return category;
}

exports.get = async(id) => {
    const productcollection = db().collection('products');
    const detail = await productcollection.findOne({_id: ObjectId(id)});
    return detail;
}

exports.get1 = async(id) => {
    const productcollection = db().collection('categories');
    const detail = await productcollection.findOne({_id: ObjectId(id)});
    return detail;
}

exports.catelist = async() => {
    const catego = db().collection('categories');
    const typecategory = await catego.find({}).toArray();
    return typecategory;
}

exports.listcate = async (id) => {
    const productcollection = db().collection('products');
    const category = await productcollection.find({categoryID: ObjectId(id)}).toArray();
    console.log('category', category);
    return category;
}