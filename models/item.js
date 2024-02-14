const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    item_name: {type:String, required:true, maxLength:100},
    item_category: {type:Schema.Types.ObjectId, ref:"Category", required:true},
    amount_in_stock: {type:Number, required:true},
    item_summary: {type:String, maxLength:10000},
    item_price: { type:Number, required:true}
    }
)

//Virtual for Items schema
ItemSchema.virtual("url").get(function() {
    return `/inventory/item/${this._id}`
})

module.exports = mongoose.model('Item', ItemSchema)