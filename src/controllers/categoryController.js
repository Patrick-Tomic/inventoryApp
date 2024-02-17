const Category = require("../models/category") 
const Item = require("../models/item")
const {body, validationResult} = require("express-validator")
const asyncHandler = require('express-async-handler')


exports.categories = asyncHandler(async(req, res, next) => {
    const list = await Category.find({},'category_name _id').sort({category_name:1, _id:1}).exec()

    res.render('category_list', {title:'Categories', list:list});
})

exports.category = asyncHandler(async (req, res, next) => {
    const [category, itemsInCategory] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({item_category:req.params.id}, 'item_name item_summary _id').exec()
    ])
    if(category === null) {
        const err = new Error("category not found")
        err.status = 404
        return next(err)
    }

    res.render('category_detail', {
        title:category,
        category_items:itemsInCategory
    })

})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_create_post = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_delete_get = asyncHandler(async (req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_delete_post = asyncHandler(async(req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_update_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})