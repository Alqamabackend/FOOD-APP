const express = require ("express");
const authMiddleware = require ("../middleware/authMiddleware");
const {createFoodController , getAllFoodController, updateAllFoodController, placeOrderController, orderStatusController} = require("../controllers/foodController");
const adminMiddleware = require("../middleware/adminMiddleware");
const router =  express.Router();


//routes
router.post("/createFood" , authMiddleware, createFoodController)

// GET ALL ROUTES
router.get("/getAllFood", getAllFoodController)
//UPDATE FOOD 

router.put("/updateAllFood/:id" , authMiddleware , updateAllFoodController)

//ORDER PLACE
router.post("/order" , authMiddleware , placeOrderController)

//order 
router.post("/orderstatus/:id" ,adminMiddleware, authMiddleware ,orderStatusController)

module.exports = router;

