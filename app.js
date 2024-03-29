const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const userroute = require('./routes/user.routes')
const cookieParser = require("cookie-parser");



const db = "mongodb+srv://baadhirabaadhi98:badera@cluster0.62pzrrt.mongodb.net/taskmanagement?retryWrites=true&w=majority";
mongoose.connect(db, { useNewurlParser: true }).then(() => {
    console.log("database connected successfully")
}).catch(err => {
    console.log(err, "error connecting to database")
})
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://todoplannerr.netlify.app', changeOrigin: true }));
app.get('/', (req, res) => {
    res.send("hii");
})
app.use('/user', userroute)
app.listen(3000, () => {

    console.log("app listening at 3000");
})