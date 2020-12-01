const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detailController');

router.post('/',(req,res,next)=>
{
   const pname=req.body.name;
   const pprice=req.body.price;
   const poverview=req.body.overview;
   const pimg=req.body.img;
   const books = list.list();
   res.render('single-product',{pname,pprice,poverview,pimg,books});
})
module.exports=router;