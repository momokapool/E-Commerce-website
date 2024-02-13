const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const dbconnect = require('./config/dbconnect')
const authRoute = require('./routes/authRoute')
const {notFound, errorHandler} = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')


dbconnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

app.use("/api/user", authRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`)
})