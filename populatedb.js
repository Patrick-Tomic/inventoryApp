//get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category")
const Item = require("./models/item")

const items = []
const categories = []

const Mongoose = require('mongoose')
Mongoose.set('strictQuery',false)
const mongoDB = userArgs[0]
main().catch((err) => console.log(err))


async function main(){
    console.log("Debug: About to connect")
    await Mongoose.connect(mongoDB)
    console.log("Debug:Should be connected?")
    await createCategories()
    await createItems()
    console.log("Debug: closing mongoose")
    Mongoose.connection.close()
}

async function categoryCreate(name) {
    const category = new Category({category_name:name})
    await category.save()
    categories[categories.length] = category
    console.log(`Added Category: ${name}`)
}
async function itemCreate(name, category, stock, price, summary) {
    const itemDetail = {
        item_name:name,
        amount_in_stock:stock,
        item_price:price
    }
    if(category != false) {
        itemDetail.item_category = category
    }
    if(summary != false) {
        itemDetail.item_summary = summary
    }

    const item = new Item(itemDetail)
    await item.save()
    items[items.length] = item
    console.log(`Added item: ${name}`)
}

async function createCategories() {
    console.log('Adding Categories')
    await Promise.all([
        categoryCreate('Saxophone'),
        categoryCreate('Guitar'),
        categoryCreate('Piano'),
        categoryCreate('Misc.'),
    ])
}
async function createItems() {
    console.log("Creating Items")
    await Promise.all([
        itemCreate('Accoustic Guitar', categories[0], 7, 149.99,'A great starter instrument for any aspiring musician'),
        itemCreate('Yamaha Keyboard',categories[1], 4, 399.99, 'become a wiz at the keys!'),
        itemCreate('John Coltranes',categories[3], 1, 250000,'Legendary John Coltranes personal sax')
    ])
}