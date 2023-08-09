const express = require( "express");
const dotenv=require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`Server listening to port ${process.env.PORT}`)
});