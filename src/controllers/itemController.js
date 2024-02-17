const Item = require("../models/item")
const Category = require("../models/category")

const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) =>{ 
    const allItems = await Item.find({},'item_name item_category amount_in_stock item_summary item_price')
    .sort({item_name:1, amount_in_stock:1, item_summary:1, item_price:1})
    .populate('item_category')
    .exec()
  
    res.render("index", {title:'Jam House',items:allItems})
})

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate('item_category').exec()
    
    if(item === null) {
        const err = new Error("Item not found")
        err.status = 404
        return next(err)
    }

    res.render('itemDetail', {
        title: item.item_name,
        item:item
    })
})
  
exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.item_create_post = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.item_delete_get = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.item_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.item_update_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})  