const express = require ("express")
const {getUserController,updateUserController, resetPasswordController ,updatePasswordController, deleteProfileController} = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router()

// GET USER
router.get("/getUser" ,authMiddleware, getUserController)
//UPDATE PROFILE
router.put("/updateUser", authMiddleware , updateUserController)

//UPDATE PASSWORD
router.post("/updatePassword" ,authMiddleware , updatePasswordController)
//RESET
router.post("/resetPassword" , authMiddleware , resetPasswordController)

// delete user
router.delete("/deleteUser/:id", authMiddleware , deleteProfileController)


module.exports = router;