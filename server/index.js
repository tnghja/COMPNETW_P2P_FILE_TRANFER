const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./Routes/userRoutes')
const path = require('path')

const app = express()
require('dotenv').config()

app.use(express.urlencoded({
  extended : true
}
))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs');
app.use("/api/users", userRoute)

const port = process.env.PORT || 3000;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port} `)
})

mongoose.connect(uri)
  .then(()=>{
    console.log("Connected to MongoDB");
  })
  .catch(()=>{
    console.log("Couldn't connect to MongoDB");
  })