//get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./src/models/category")
const Item = require("./src/models/item")

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
        itemCreate('Accoustic Guitar', categories[0], 7, 149.99,'A great starter instrument for any aspiring musician, easier then the electric, but still little tricky'),
        itemCreate('Yamaha Keyboard',categories[1], 4, 399.99, '88-key weighted keyboard, comes with pedal and stand'),
        itemCreate('Alto Saxophone kit',categories[3], 1, 150),
        itemCreate("Saxophone Cleaning Kit", categories[3], 4,29.99),
        itemCreate('Saxophone Reeds',categories[3], 88, 7.99),
        itemCreate('Capo', categories[0], 52, 14.89),
        itemCreate('Guitar picks(5pc)',categories[0],28,7.99),
        itemCreate('American Vintage II 1966 Jazzmaster',categories[0],1,2499.99, `The Jazzmaster® was originally advertised as a guitar that contained "all the well-known Fender developments," where "every convenience is provided." Intended to provide a luxury playing experience and tempt jazz guitarists into playing solidbody electric guitars, this futuristic and comfort-contoured offset is about as far from a boxy archtop as can be imagined. Perhaps unsurprisingly, the guitar failed to catch on with the jazz crowd, but instead gained early acceptance with '60s surf, and later, indie-rock, alternative, and even country players.`),

    ])
}