const productModel = require('../models/productModel');

exports.index = async(req, res, next) => {
    const products = await productModel.list();
    console.log('products', products);

    res.render('', {products});
};

exports.category = async(req, res, next) => {
    const products = await productModel.list();
    console.log('products', products);

    res.render('category', {
        products,
        banner: 'Shop Category'
    });
};

exports.details = async(req, res, next) => {
    const product = await productModel.get(req.params._id);
    res.render('single_product', {
        product,
        banner: 'Shop Single'
    });
}
