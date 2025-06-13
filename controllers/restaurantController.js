const restaurantModel = require("../models/restaurantModel");
const RestaurantModel = require ("../models/restaurantModel")
const createRestaurantController = async(req , res) => {
    try {
        const {title ,imageUrl , foods , time , pickup , delivery , isOpen , logoUrl , rating , ratingCount , code , coords}  = req.body;
        if(!title || !coords){
            return res.status(500).send({
            success:false,
            message: "provide title and address",
            error
            })
        }
        const newRestaurant = new RestaurantModel({title ,imageUrl , foods , time , pickup , delivery , isOpen , logoUrl , rating , ratingCount , code , coords});

        await newRestaurant.save()
         res.status(201).send({
            success:true,
            message: "created  restaurant successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "errorr in creation of restaurant",
            error
        })
    }
};

//GET ALL RESTAURANT
const getAllRestaurantController = async(req , res) => {
    try {
        const restaurants = await RestaurantModel.find({});
        if(!restaurants){
           res.status(404).send({
            success:false,
            message: "no restaurant available",
        }) 
        }
        res.status(200).send({
            success:true,
           totalCount: restaurants.length,
           restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in getting all restaurant",
            error
        })
    }
}

// DELETE RESTAURANT 
const deleteRestaurantController = async(req , res) => {
    try {
        const restaurantid = req.params.id
        if(!restaurantid)
        {
            return res.status(404).send({
                success:false,
                message:"no id to delete "
            })
        }
        await restaurantModel.findByIdAndDelete(restaurantid)
        res.status(200).send({
                success:true,
                message:"successfully deleted "
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in deleting restaurant",
        })
    }
}


module.exports = {createRestaurantController,getAllRestaurantController , deleteRestaurantController};