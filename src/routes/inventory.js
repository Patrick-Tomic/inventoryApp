const express = require("express")
const router = express.Router()

//controllers
const item_controller = require("../controllers/itemController")


//get home page
 router.get("/", item_controller.index)

module.exports = router;