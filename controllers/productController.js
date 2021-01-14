const mongoose = require('mongoose')
const formidable = require('formidable');
const fs = require('fs'); 
const fsPromise = fs.promises;

var ObjectId = require('mongoose').ObjectId;

const categories = require('../models/categories');
const products = require('../models/products');
const comments = require('../models/comments.js');
const categoryModel = require('../models/Service/categoryModel');
const productModel = require('../models/Service/productModel');
const commentModel = require('../models/Service/commentModel');

var ITEM_PER_PAGE = 3;
var SORT_ITEM;
var sort_value = "Giá thấp tới cao";
var pauthor;
var pprice = '99';
var plowerprice;
var price;
var searchText;

exports.index = async(req, res, next) => {
    try{

    // var cartProduct;
    // if (!req.session.cart) {
    //   cartProduct = null;
    // } else {
    //   var cart = new Cart(req.session.cart);
    //   cartProduct = cart.generateArray();
    // }

        const categories = await categoryModel.list();
        const products = await productModel.listlimitindex(8);
        console.log(req.user);
        res.render('index', {
            categories,
            products
        });
    } catch(err) { console.log(err) };
};

exports.category = async (req, res, next) => {

    pauthor = req.query.author !== undefined ? req.query.author : "";
    pprice = req.query.price !== undefined ? req.query.price : pprice;
    searchText = req.query.search !== undefined ? req.query.search : "";
    plowerprice = (pprice !== '99' ? pprice - 10 : 0);
    SORT_ITEM = req.query.orderby;
    ITEM_PER_PAGE = parseInt(req.query.numItems);

    if(req.query.author==null|| isNaN(req.query.author)){req.query.author=""};
    if(req.query.price==null|| isNaN(req.query.price)){req.query.price=99};
    if(req.query.orderby==null || isNaN(req.query.orderby)){req.query.orderby=1};
    if(req.query.numItems==null || isNaN(req.query.numItems)){req.query.numItems=99};

    if (SORT_ITEM == -1) {
        sort_value = "Giá cao tới thấp";
        price = "-1";
    }
    if (SORT_ITEM == 1) {
        sort_value = "Giá thấp tới cao";
        price = "1";
    }
    if (Object.entries(req.query).length == 0) {
        pauthor = "";
    }
    var page = +req.query.page || 1;
    let totalItems = await productModel.count(pauthor, plowerprice, pprice, searchText);
     
    const allproducts = await productModel.list();
    const products = await productModel.listlimit(ITEM_PER_PAGE, pauthor, page, price, plowerprice, pprice, searchText);
    const topproducts1 = await productModel.listlimitindex(4);
    let categories = await categoryModel.list();
        res.render("category", {
            allproducts,
            topproducts1,
            products,
            currentPage: page,
            categories,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
            ITEM_PER_PAGE: ITEM_PER_PAGE,
            sort_value: sort_value,
            banner: "Book Category"
            // cartProduct: cartProduct
        });
};


exports.categorybyid = async (req, res, next) => {
    
    pauthor = req.query.author !== undefined ? req.query.author : "";
    pprice = req.query.price !== undefined ? req.query.price : pprice;
    searchText = req.query.search !== undefined ? req.query.search : "";
    plowerprice = (pprice !== '99' ? pprice - 10 : 0);
    SORT_ITEM = req.query.orderby;
    ITEM_PER_PAGE = parseInt(req.query.numItems);

    if(req.query.author==null|| isNaN(req.query.author)){req.query.author=""};
    if(req.query.price==null|| isNaN(req.query.price)){req.query.price=99};
    if(req.query.orderby==null || isNaN(req.query.orderby)){req.query.orderby=1};
    if(req.query.numItems==null || isNaN(req.query.numItems)){req.query.numItems=99};

    if (SORT_ITEM == -1) {
        sort_value = "Giá cao tới thấp";
        price = "-1";
    }
    if (SORT_ITEM == 1) {
        sort_value = "Giá thấp tới cao";
        price = "1";
    }
    if (Object.entries(req.query).length == 0) {
        pauthor = "";
    }
    var page = +req.query.page || 1;
    let totalItems = await productModel.countbyidcate(req.params.categoryID, pauthor, plowerprice, pprice, searchText);
     
    const allproducts = await productModel.list();
    const products = await productModel.listbyidcate(req.params.categoryID,ITEM_PER_PAGE, pauthor, page, price, plowerprice, pprice, searchText);
    const topproducts1 = await productModel.listlimitindex(4);
    let categories = await categoryModel.list();
        res.render("category", {
            allproducts,
            topproducts1,
            products,
            currentPage: page,
            categories,
            hasNextPage: ITEM_PER_PAGE * page < totalItems,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
            ITEM_PER_PAGE: ITEM_PER_PAGE,
            sort_value: sort_value,
            banner: "Book Category"
            // cartProduct: cartProduct
        });
};

exports.detailproduct = async(req, res, next) => {
    const product = await productModel.get(req.params.productID);
    const detailcategory = await categoryModel.getbyid(req.params.categoryID);
    const comments = await commentModel.listbyid(req.params.productID);
    const topproducts1 = await productModel.listbyidcate(req.params.categoryID,4);

    res.render('single_product', {
        product,
        detailcategory,
        comments,
        topproducts1,
        banner: 'Book Detail'
    });
}
