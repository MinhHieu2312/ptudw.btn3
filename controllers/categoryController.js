const categoryModel = require('../models/categoryModel');

exports.index = async (req, res, next) => {
    // Get cat from model
    const category = await categoryModel.list();

    console.log('categoryRoute', category);
    
    // Pass data to view to display list of cat
    res.render('category', {category});
    res.render('index',  {category});
};

exports.details = async (req, res, next) => {

    res.render('single-product', await detailModel.get(req.params._id));
}