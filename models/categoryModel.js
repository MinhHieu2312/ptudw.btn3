const {db} = require('../dal/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const categorycollection = db().collection('categories');
    const categories = await categorycollection.find({}).toArray();
    return categories;
}

exports.getbyid = async(id) => {
    const categorycollection = db().collection('categories');
    const detail = await categorycollection.findOne({_id: ObjectId(id)});
    return detail;
}