const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
dotenv.config();  
const PORT = process.env.PORT ;

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});