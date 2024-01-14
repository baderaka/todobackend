const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const userroute = require('./routes/user.routes')
const cookieParser = require("cookie-parser");



const db = "mongodb+srv://baadhirabaadhi98:Badera@98@cluster0.dnfcdfl.mongodb.net/";
mongoose.connect(db, { useNewurlParser: true }).then(() => {
    console.log("database connected successfully")
}).catch(err => {
    console.log("error connecting to database")
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));
app.get('/', (req, res) => {
    res.send("hii");
})
app.use('/user', userroute)
app.listen(3000, () => {

    console.log("app listening at 3000");
})