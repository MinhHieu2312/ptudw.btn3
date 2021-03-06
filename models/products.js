const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product = new Schema({
    name: String,
    price: Number,
    img: [Object],
    slug: String,
    auslug: String,
    author:String,
    overview: String,
    description: String,
    detail: Object, 
    slug: { type: String, slug: ['name', 'author'], unique: true },
    view: Number,
    categoryID: ObjectId,
}, { timestamps: true });

const index = {
    name: "text",
    slug: "text",
    auslug: "text",
    author: "text",
    overview: "text",
    description: "text"
};
Product.index(index);

Product.plugin(mongoosePaginate);

// Model name => collection
module.exports = mongoose.model('Product', Product, 'products');

