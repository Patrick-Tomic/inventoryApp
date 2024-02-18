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
   res.render("category_form", {title:"Jam House", errors:[]})
})

exports.category_create_post = [

    body("name", 'Category name must contain at least 3 characters')
    .trim().isLength({min:3}).escape(),

asyncHandler(async (req,res,next) => {
     const errors = validationResult(req)
     //Create a category object with escaped and trimmed data
     const category = new Category({category_name:req.body.name})

     if(!errors.isEmpty()) {
        //There are errors render the form again with sanitized values/error messages
        res.render("category_form", {title:"Jam House", errors:errors.array()})
    return  
    } else {
        const categoryExists = await Category.findOne({category_name:req.body.name}).exec()
        if(categoryExists) {
            res.redirect(`..//category/${categoryExists._id}`)
        } else {
            await category.save()

            res.redirect(`..//category/${category._id}`)
        }
    }
})
]

exports.category_delete_get = asyncHandler(async (req,res,next) => {
    //Get details categories and all items
    const [category, allItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category_name:req.params.id}, "item_name item_summary id").exec()
    ])

    if(category === null) {
     res.redirect("..//categories")       
    } else {
        res.render("category_delete", {
            title: 'Jam House',
            category:category,
            items:allItems
        })
    }
})

exports.category_delete_post = asyncHandler(async(req, res, next) => {
    const [category, allItems] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Item.find({category:req.params.id}, 'item_name item_summary').exec(),
    ])

    if(allItems.length > 0) {
        res.render("category_delete",  {
            title:'Jam House',
            category:category,
            items:allItems
        })
        return 
    } else {
        await Category.findByIdAndDelete(req.body.categoryid)
        res.redirect("/categories")
    }
})

exports.category_update_get = asyncHandler(async(req,res,next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})