const categoryModel = require('../models/categoryModel');
const productModel = require('../models/productModel');
const commentModel = require('../models/commentModel');

exports.index = async(req, res, next) => {
    const categories = await categoryModel.list();
    const products = await productModel.listlimit(8);

    res.render('index', {
        categories,
        products
    });
};

exports.category = async (req, res, next) => {
    const products = await productModel.listlimit(6);
    const topproducts1 = await productModel.listlimit(4);
    const categories = await categoryModel.list();
    
    res.render('category', {
        products,
        topproducts1,
        categories,
        banner: 'Book Category'
    });
};

exports.categorybyid = async (req, res, next) => {
    const products = await productModel.listbyidcate(req.params.categoryID)
    const topproducts1 = await productModel.listbyidcatelimit(req.params.categoryID,4);
    const categories = await categoryModel.list();
    
    res.render('category', {
        products,
        topproducts1,
        categories,
        banner: 'Book Category'
    });
};

exports.detailproduct = async(req, res, next) => {
    const product = await productModel.get(req.params.productID);
    const detailcategory = await categoryModel.getbyid(req.params.categoryID);
    const comments = await commentModel.listbyid(req.params.productID);

    res.render('single_product', {
        product,
        detailcategory,
        comments,
        banner: 'Book Detail'
    });
}
