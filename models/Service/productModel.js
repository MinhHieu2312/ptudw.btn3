const Product = require('../products');
const Bill = require('../bills');
var ObjectId = require('mongoose').Types.ObjectId; 
const {bodyToMongoose} = require('../../util/bodyToMongoose');

exports.list= async () => {
    const products= await Product.find({}) .limit(10) .lean(); 
    return products;
}

exports.listlimit = async (limit, pauthor, page, price, plowerprice, pprice, text, categoryId) => {
    var products
    
    if(categoryId==''||categoryId==' '||categoryId==null){
        products= await Product.find({
            name: new RegExp(text, "i"),
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
            categoryID: new ObjectId(categoryId),
            name: new RegExp(text, "i"),
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

exports.count = async (pauthor, plowerprice, pprice, text, categoryId) => {
    var count;
    if(categoryId==''||categoryId==' '||categoryId==null){
        count = await Product.find({
            name: new RegExp(text, "i"),
            auslug: new RegExp(pauthor, "i"),
            price: { $gt: plowerprice, $lt: pprice }
        }).countDocuments().lean();
    } else{
        count = await Product.find({
            categoryID: new ObjectId(categoryId),
            name: new RegExp(text, "i"),
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
    await Product.findByIdAndUpdate({"_id" : ObjectId(id)}, {"view": detail.view+1}).lean();
    return detail;
}

// exports.listrelevant = async (_id) => {
//     const bill = await Bill.find({"detail": new RegExp(_id, "i")}).limit(1).lean();
//     console.log("bi:");
//     console.log(bill);
//     const products = await Product.find({"_id": bill.detail}).limit(4).lean();
//     return products;
// }