const commentcollection = require('../comments');
var ObjectId = require('mongoose').Types.ObjectId; 

exports.listbyid = async (productid) => {
    const comments = await commentcollection.find({"productID": new ObjectId(productid)}).lean();
    return comments;
}