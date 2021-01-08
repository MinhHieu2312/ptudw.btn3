const {db} = require('../dal/db');
const {ObjectId} = require('mongodb');

exports.list = async () => {
    const productcollection = db().collection('products').aggregate([
        {
            $lookup:{
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categorydetails'
            }
        }
    ]);
    const products = await productcollection.toArray();
    return products;
}

exports.listlimit = async (limit) => {
    const productcollection = db().collection('products').aggregate([
        {
            $lookup:{
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'categorydetails'
            }
        }
    ]).limit(limit);
    const products = await productcollection.toArray();
    return products;
}

exports.get = async(id) => {
    const productcollection = db().collection('products');
    const detail = await productcollection.findOne({_id: ObjectId(id)});
    return detail;
}

exports.listbyidcate = async (cateid) => {
    const productcollection = db().collection('products');
    const products = await productcollection.find({"categoryID": ObjectId(cateid)}).toArray();
    return products;
}

exports.listbyidcatelimit = async (cateid, limit) => {
    const productcollection = db().collection('products');
    const products = await productcollection.find({"categoryID": ObjectId(cateid)}).limit(limit).toArray();
    return products;
}
