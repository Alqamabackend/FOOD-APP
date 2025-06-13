const express = require ("express");
const authMiddleware = require ("../middleware/authMiddleware");
const {createRestaurantController , getAllRestaurantController, deleteRestaurantController} = require("../controllers/restaurantController");
const router = express.Router();

//routes
router.post("/create" , authMiddleware ,createRestaurantController)
// get all restaurant
router.get("/getAll" , getAllRestaurantController)

//DELETE RESTAURANT
router.delete("/delete/:id" , authMiddleware , deleteRestaurantController)


module.exports = router;