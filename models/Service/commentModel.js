const commentcollection = require('../comments');
var ObjectId = require('mongoose').Types.ObjectId;
const {bodyToMongoose} = require('../../util/bodyToMongoose');

exports.listbyid = async (productid, page) => {
    const comments = await commentcollection.find({"productID": new ObjectId(productid)}).limit(1).skip(page - 1).lean();
    return comments;
}

exports.countlistbyid = async (productid) => {
    const comments = await commentcollection.find({"productID": new ObjectId(productid)}).countDocuments().lean();
    return comments;
}

exports.store = async(reqBody, _id) => {
    datatext = bodyToMongoose(reqBody, _id);
    const comment = new commentcollection(datatext);
    await comment.save();
}