const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Bill = new Schema({
    userID: ObjectId,
    password: String,
    detail : {type:Array, default: []}

}, { timestamps: true });

module.exports = mongoose.model('Bill', Bill);