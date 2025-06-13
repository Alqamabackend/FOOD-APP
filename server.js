const express = require ("express")
const app = express();
const cors = require ("cors")
const morgan  = require ("morgan")

const dotenv = require ("dotenv");

dotenv.config();

//db connection
const connectDB = require("./config/db.js");
connectDB()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

// routes
app.use("/api", require("./routes/testRoute"))
app.use("/api" , require("./routes/authRoute.js"))
app.use("/api" , require ("./routes/userRoute.js"))
app.use("/api" , require("./routes/restaurantRoute.js"))
app.use("/api"  ,require("./routes/categoryRoute.js"))
app.use("/api" , require("./routes/foodRoute.js"))

app.get("/" , (req, res) => {
    res.send("Hello World")
})

const PORT = process.env.PORT || 3002;
app.listen (PORT , ()=> {
    console.log(`server running on ${PORT}`)
});