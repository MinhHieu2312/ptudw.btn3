const Product = require('../products');
var ObjectId = require('mongoose').Types.ObjectId; 
const {bodyToMongoose} = require('../../util/bodyToMongoose');

exports.list= async () => {
    const products= await Product.find({}) .limit(10) .lean(); 
    return products;
}

exports.listlimit = async (limit, pauthor, page, price, plowerprice, pprice) => {
    const products= await Product.find({
        auslug: new RegExp(pauthor, "i"),
        price: { $gt: plowerprice, $lt: pprice }
    })  .skip((page - 1) * limit)
        .limit(limit)
        .sort({
        price
        })
        .lean(); 
    return products;
}

exports.count = async (pauthor, plowerprice, pprice) => {
    const count = await Product.find({
        auslug: new RegExp(pauthor, "i"),
        price: { $gt: plowerprice, $lt: pprice }
    }).countDocuments().lean();

    return count;
}

exports.listbyidcate = async (cateid, limit) => {
    const products = await Product.find({"categoryID": new ObjectId(cateid)}).limit(limit).lean();
    return products;
}


exports.get = async(id) => {
    const detail = await Product.findById(id).lean();
    return detail;
}