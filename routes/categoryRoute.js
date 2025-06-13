const express = require('express');
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const {createCatController , getAllController, updateCatController} = require('../controllers/categoryController');
//ROUTES
router.post("/createCat" ,authMiddleware ,createCatController )

//GET CONTROLLER
router.get("/getAllCat" , getAllController)

//UPDATE CAT
router.put("/updateCat/:id" ,authMiddleware ,updateCatController)

module.exports = router;