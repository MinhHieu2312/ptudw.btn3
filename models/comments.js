const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
    name: String,
    text: String,
    avt_img: String,
    date:String,
    productID: ObjectId,
}, { timestamps: true });

Comment.plugin(mongoosePaginate);

// Model name => collection
module.exports = mongoose.model('Comment', Comment);

