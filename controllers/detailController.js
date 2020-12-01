const detailModel = require('../models/detailModel');

exports.details = async (req, res, next) => {
    res.render('single-product', await detailModel.get(req.params._id));
}