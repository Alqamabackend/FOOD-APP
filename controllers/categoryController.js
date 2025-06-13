const categoryModel = require("../models/categoryModel")

//CREATE CAT
const createCatController = async(req ,res) => {
    try {
        const {title , imageUrl} = req.body
        if(!title){
           return res.status(500).send({
            success:false,
            message: "provide title",
            error
        })
        }
        const newCategory = new categoryModel({title , imageUrl})
        await newCategory.save();
        res.status(200).send({
            success:true,
            message: "created category",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "error in creation in categry controller",
            error
        })
    }
}

//GET ALL
const getAllController = async (req , res) => {
    try {
        const category  = await categoryModel.find({})
        if(!category){
            return res.status(404).send({ success: false , message : "No category found" })
        }
        res.status(200).send({
            success:true,
            totalCat:category.length,
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all categories",
        })
    }
}

//UPDATE CAT
const updateCatController = async(req , res) => {
    try {
        const {id} = req.params
        const {title , imageUrl} = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id , {title } , {new : true})
        if(!updateCategory){
               return res.status(500).send({
                    success: false,
                    message : "no cattegory found"
               })
        }
        res.status(200).send({
            success:true,
            message:"category updated ",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting all categories",
        })
    }
}


module.exports= {createCatController , getAllController , updateCatController};