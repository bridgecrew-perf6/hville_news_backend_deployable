import express from "express";
import {readdirSync} from "fs";
import cors from "cors";
import mongoose from "mongoose";
const morgan = require("morgan");
require("dotenv").config();


const app = express();

//db connection
mongoose
.connect(process.env.DATABASE, {})
.then(()=> console.log("DB connected"))
.catch((err)=> console.log(`db connect error: ${err}`));

//yah
app.get("/", (req, res) => {
    res.send("Express on Vercel");
  });


//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json()); //converts the request

//route midleware
readdirSync("./routes").map((r)=>
app.use("/api", require(`./routes/${r}`))
);


//running the server
const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`server is running on ${port}`));

module.exports = app;