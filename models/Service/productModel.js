const Product = require('../products');
var ObjectId = require('mongoose').Types.ObjectId; 
const {bodyToMongoose} = require('../../util/bodyToMongoose');

exports.list= async () => {
    const products= await Product.find({}) .limit(10) .lean(); 
    return products;
}

exports.listlimit = async (limit, pauthor, page, price, plowerprice, pprice, text) => {
    var products
    
    if(text==null||text==""){
        products= await Product.find({
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        })  .skip((page - 1) * limit)
            .limit(limit)
            .sort({
            price
            })
            .lean();
    } else{
        products= await Product.find({
            $text : {$search : text},
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        })  .skip((page - 1) * limit)
            .limit(limit)
            .sort({
            price
            })
            .lean();
    }
    
    return products;
}

exports.listlimitindex = async (limit) => {
    const products= await Product.find({}).limit(limit).lean(); 
    return products;
}

exports.count = async (pauthor, plowerprice, pprice, text) => {
    console.log(text);
    var count;
    if(text==null || text==""){
        count = await Product.find({
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        }).countDocuments().lean();
    } else{
        count = await Product.find({
            $text : {$search : text},
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        }).countDocuments().lean();
    }
    
    return count;
}

exports.listbyidcate = async (cateid, limit, pauthor, page, price, plowerprice, pprice, text) => {
    var products
    
    if(text==null||text==""){
        products= await Product.find({
            "categoryID": ObjectId(cateid),
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        })  .skip((page - 1) * limit)
            .limit(limit)
            .sort({
            price
            })
            .lean();
    } else{
        products= await Product.find({
            "categoryID": ObjectId(cateid),
            $text : {$search : text},
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        })  .skip((page - 1) * limit)
            .limit(limit)
            .sort({
            price
            })
            .lean();
    }
    
    return products;
}

exports.countbyidcate = async (cateid, pauthor, plowerprice, pprice, text) => {
    console.log(text);
    var count;
    if(text==null || text==""){
        count = await Product.find({
            "categoryID": ObjectId(cateid),
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        }).countDocuments().lean();
    } else{
        count = await Product.find({
            "categoryID": ObjectId(cateid),
            $text : {$search : text},
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        }).countDocuments().lean();
    }
    
    return count;
}


exports.get = async(id) => {
    const detail = await Product.findById(id).lean();
    return detail;
}