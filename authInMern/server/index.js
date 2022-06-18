require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connections = require("./db");
const userRoutes = require('./routes/users');
const userRoutes = require('./routes/auth')
connections();
app.use(express.json())
app.use(cors());
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
const port  = process.env.PORT||8080;
app.listen(port,()=> console.log(`listening on port ${port}...`));