const userModel = require ("../models/userModel")
const bcrypt = require("bcrypt")
const JWT = require ("jsonwebtoken")

const registerController = async (req , res) => {
    try {
        const {userName  , email , password ,address, phone , answer} = req.body
        // validation
        if(!userName || !email || !password ||  !address || !phone || 
            !answer
        ){
            return res.status(500).send({
                success:false,
                message:"something went wrong",
            })
        }
        // check user
        const existing  = await userModel.findOne({email  })
        if(existing){
            res.status(500).send({
                success:false,
                message:"user already exist"
            })
        }
        //hashing
        var salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(password , salt)
        // create new user 
        const user = await userModel.create({
            userName  , email , password : hashedPassword , address, phone , answer
        });
        res.status(200).send({
            success:true,
            message:"user created successfully",
            user,
        })
    } catch (error) {
        console.log("error")
        res.status(500).send({
            success:false,
            message:"something went wrong",
            error
        })
    }
}

const loginController = async(req , res) => {
        try {
            const {email  , password} = req.body
            if(!email  || !password){
                res.status(500).send({
                    success:false,
                    message:"provide email or password"
                })
            }
            const user = await userModel.findOne({email });
                if(!user){
                    return res.status(404).send({
                        success:false,
                        message:"user not found"
                    })
                }
                // check password or compare password 
            const isMatch = await bcrypt.compare(password ,user.password);
                if(!isMatch)
                {
                    res.status(500).send({
                        success:false,
                        message:"invalid credentials",
                    });
                }
                //token
                const token = JWT.sign({id : user._id} ,process.env.JWT_SECRET, {
                    expiresIn : "7d"
                })
                user.password=undefined;
                res.status(200).send({
                    success:true,
                    message:"Login successfully ",
                    token,
                    user
                });          
        } catch (error) {
            console.log("error")
            res.status(500).send({
                success:false,
                message:"ERROR IN LOGIN",
                error
            })
        }
}

module.exports = {registerController , loginController}

