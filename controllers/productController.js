const productModel = require('../models/productModel');

exports.index = async(req, res, next) => {
    const products = await productModel.list();
    console.log('products', products);
    const key = req.query.key;

            const query = {}; 
            
            if(key) {
                query.name = new RegExp(key,'i');
            }

    res.render('', {products, key});
};

exports.category = async(req, res, next) => {
    const products = await productModel.list();
    const categories = await productModel.catelist();

    res.render('category', {
        products,
        categories,
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

exports.categorydetail= async(req, res, next) => {
    const products = await productModel.listcate(req.params._id);
    const cate = await productModel.get1(req.params._id);
    const categories = await productModel.catelist();

    let banner1 = cate.name;

    res.render('category', {
        products,
        categories,
        banner: 'Shop Category',
        banner1
    });
}
