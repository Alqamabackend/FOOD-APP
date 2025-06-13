const testController = (req, res) => {
    try {
        res.status(200).send({
            success:true,
            message:"test controller is working",
        })
    } catch (error) {
        console.log("error in api")
    }
}

module.exports = testController;