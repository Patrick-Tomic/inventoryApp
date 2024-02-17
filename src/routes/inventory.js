const express = require("express")
const router = express.Router()

//controllers
const item_controller = require("../controllers/itemController")
const category_controller = require('../controllers/categoryController')

//get home page
 router.get("/", item_controller.index)

 router.get("/item/:id", item_controller.item_detail)
 //item routes
 /* router.get("/item/create", item_controller.item_create_get);

 router.post("/item/create", item_controller.item_create_post);

 router.get("/item/:id/delete", item_controller.item_delete_get);

 router.post("/item/:id/post",item_controller.item_delete_post);

 router.get("/item/:id/update", item_controller.item_update_get);

 router.post("/item/:id/update", item_controller.item_update_post);

//category routes

router.get('/category/create', category_controller.category_create_get )

router.post('/category/create',category_controller.category_create_post)

router.get('/category/:id/update', category_controller.category_update_get)

router.post('/category/:id/update', category_controller.category_update_post)

router.get('/category/:id/delete', category_controller.category_delete_get )

router.post('/category/:id/delete', category_controller.category_delete_post)
*/
router.get('/category/:id', category_controller.category )  

router.get('/categories', category_controller.categories )


module.exports = router;