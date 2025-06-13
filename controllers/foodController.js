// CREATE FOOD
const foodModel = require ("../models/foodModel")
const orderModel = require ("../models/orderModel")
const createFoodController = async(req , res) => {
    try {
        const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,
    } = req.body;
    if(!title || !description || !price || !resturnat)
    {
        return res.status(500).send({
            success: false,
            message: "Please provide all the required fields",
        })
    }
    const newFood = new foodModel ({
        title, description, price, imageUrl, foodTags, catgeory, code, isAvailabe, resturnat, rating
    })
    await newFood.save()
    res.status(200).send({
        success: true, message: "Food created successfully!", newFood   
    })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: "Error in creating food",
            error
        })
    }
}

const getAllFoodController = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        if(!foods){
            return res.status(404).send({ success: false, message: "No food found!!" })
        }
        res.status(200).send({ success: true, message: "Successfully fetched all the foods!!",
            totalFoods: foods.length,
            foods
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: "Error in getting api ",
            error
        })
    }
}
 

const updateAllFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(500).send({
            success: false, 
            message: "Error in creating food",
            error
        })
        }
        const food = await foodModel.findByIdAndUpdate(foodId)
        if(!food){
            return res.status(500).send({
            success: false, 
            message: "Error in creating food",
            error
            })
        }
        // console.log(food)
        const {title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,} = req.body
      const updatedFood = await foodModel.findByIdAndUpdate(food , {title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      resturnat,
      rating,} , {new :true})
      res.status(200).send({
        success:true,
        message:"get aalll"
      })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, 
            message: "Error in creating food",
            error
        })
    }
}

const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;

    if (!cart ) {
      return res.status(400).send({
        success: false,
        message: "Cart is required and cannot be empty",
      });
    }

    let total = 0;
    cart.forEach(item => {
      total += item.price;
    });

    const newOrder = new orderModel({
      foods: cart.map(item => item.id), // ✅ only pass IDs
      payment: total,
      buyer: req.user.id,
    });

    await newOrder.save();

    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log("Order Error:", error);
    res.status(500).send({
      success: false,
      message: "Error in Place Order API",
      error: error.message,
    });
  }
};

const orderStatusController = async () => {
    try {
        const orderId = req.params.id
        if(!orderId){
            res.status(500).send({
                success: false,
                message: "no id "
            })
        }
        const{status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId , {status} , {new :true})
        res.status(200).send({
            success:true,
            message: "order status updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
        message: "Erorr In Place Order API",
        })
        
    }
}


module.exports = {createFoodController , getAllFoodController , updateAllFoodController , placeOrderController , orderStatusController}

