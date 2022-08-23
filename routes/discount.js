const express = require('express');

const discountRouter = express.Router();

const Discount = require('../model/discountCode.model');

discountRouter.post('/', async (req,res) => {
    const {code} = req.body;

    Discount.findOne({code: code}, (err, code) => {
        if(err) throw err;
        if(!code) return res.json('This code does not exist.');


        res.json({discountValue: code.discountValue});
    });

});

module.exports = {
    discountRouter,
};
