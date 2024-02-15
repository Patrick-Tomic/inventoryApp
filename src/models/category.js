const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    category_name: {type:String, required:true, maxLength:100, minLength:3}
})

CategorySchema.virtual('url').get(function() {
    return `/inventory.item.${this._id}`
})

module.exports = mongoose.model("Category", CategorySchema)