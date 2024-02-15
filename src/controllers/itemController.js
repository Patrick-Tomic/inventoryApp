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