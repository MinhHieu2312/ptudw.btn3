const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema({
    text: String,
    productID: ObjectId,
    avt_img: String,
    name: String,
    date:String,
}, { timestamps: true });

Comment.plugin(mongoosePaginate);``

// Model name => collection
module.exports = mongoose.model('Comment', Comment);

