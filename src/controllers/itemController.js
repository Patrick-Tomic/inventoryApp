const Item = require("../models/item")
const Category = require("../models/category")

const {body, validationResult} = require("express-validator")
const asyncHandler = require("express-async-handler")
const { categories } = require("./categoryController")

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

exports.all_items = asyncHandler(async(req,res,next) => {
    const allItems = await Item.find({},'item_name item_category amount_in_stock item_summary item_price')
    .sort({item_name:1, amount_in_stock:1, item_summary:1, item_price:1})
    .populate('item_category')
    .exec()
  
    res.render("items", {title:'Jam House',items:allItems})
})

exports.item_create_get = asyncHandler(async (req, res, next) => {
    const allCategories = await Category.find().sort({category_name:1}).exec()
   res.render("item_form", {title:'Jame House', errors:[], categories:allCategories})
})

exports.item_create_post = [

    body("name", 'Item name must contain at least 3 characters')
    .trim().isLength({min:3}).escape().withMessage("Item name must be specified"),
    body("category.*").escape(),
    body("summary", 'summary must not be empty').trim()
    .escape(),
    body('amount_in_stock', 'must be a numeric character').trim()
    .escape(),
    body("price", 'must be a numeric character').trim().escape(),
    
asyncHandler(async (req,res,next) => {
    const errors = validationResult(req)
//Create a new Item with escaped and trimmed data
    const item = new Item({
        item_name:req.body.name,
        item_category:req.body.category,
        amount_in_stock:req.body.amount_in_stock,
        item_price:req.body.price,
        item_summary:req.body.summary
    })

    if(!errors.isEmpty()) {
         //get all categories
         const allCategories = await Category.find().sort({category_name:1}).exec()
        //There are errors. Render form again with sanitized values/error messages
        res.render("item_form", {title:'Jam House', errors:errors.array(), categories:allCategories })
       return
    } else {
        const ItemExists = await Item.findOne({item_name:req.body.name}).exec()
        if(ItemExists) {
            res.redirect(`..//item/${ItemExists._id}`)
        } else {
            await item.save()

            res.redirect(`..//item/${item._id}`)
        }
    }
})
]
exports.item_delete_get = asyncHandler(async (req,res,next) => {
     const item = await Item.findById(req.params.id).exec()

     if(item === null) {
        res.redirect("..//all_items")
     } else {
        res.render("item_delete", {
            title:'Jame House',
            item:item
        })
     }
})

exports.item_delete_post = asyncHandler(async(req, res, next) => {
      
    await Item.deleteOne({_id:req.body.itemid}) 

    res.redirect('/inventory/all_items')
   
})

exports.item_update_get = asyncHandler(async(req,res,next) => {
     const item = await Item.findById(req.params.id).sort({item_name:1, item_price:1, item_summary:1, amount_in_stock:1, item_category:1}).populate("item_category").exec()
    
    
     if(item === null ) {
        const err = new Error('Item not found')
        err.status = 404
        return next(err)
     }
     const allCategories = await Category.find().sort({category_name:1, category_id:1}).exec()

  

     res.render('item_form', {title:'Jam House', item:item, errors:[], categories:allCategories})
})  

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Book delete GET");
})  