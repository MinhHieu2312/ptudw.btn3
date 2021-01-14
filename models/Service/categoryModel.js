const categorycollection = require('../categories');
var ObjectId = require('mongoose').ObjectId;

exports.list = async () => {
    const categories = await categorycollection.find({}).lean();
    return categories;
}

exports.getbyid = async(id) => {
    const detail = await categorycollection.findById(id).lean();
    return detail;
}