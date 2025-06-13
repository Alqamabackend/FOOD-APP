const express = require ("express")
const {registerController , loginController} = require("../controllers/authController")
const router = express.Router()

//REGISTER
router.post("/register" , registerController)

//LOGIN
router.post("/login" , loginController)

module.exports  = router   