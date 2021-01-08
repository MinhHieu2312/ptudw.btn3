const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.listbyid = async (productid) => {
    const commentcollection = db().collection('comments');
    const comments = await commentcollection.find({"productID": ObjectId(productid)}).toArray();
    return comments;
}