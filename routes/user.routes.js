const express = require('express')
const route = express.Router();
const mongoose = require('mongoose');
const usermodel = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { verifytoken } = require('./auth');
const postmodel = require('../models//post')
route.post('/register', async(req, res) => {
    let salt = await bcrypt.genSalt(10);
    let hashpaswd = await bcrypt.hash(req.body.password, salt);
    let newuser = await new usermodel({
        name: req.body.name,
        email: req.body.email,
        password: hashpaswd

    })
    newuser.save().then(
        (data) => {
            res.send(data);

        }
    ).catch(err => {
        res.send(err);
    })

})
route.post('/login', async(req, res) => {
        let user = await usermodel.findOne({ email: req.body.email })
        if (!user) {
            res.send("no user found with this mail id");
        }

        let pswd = await bcrypt.compare(req.body.password, user.password);
        if (!pswd) {
            res.send("inavalid password")
        } else {
            const token = jwt.sign({ id: user._id, name: user.name }, "verysecret")
            res.cookie('access_token', token, { httpOnly: true }).status(200).json({
                message: "logged in successflly",
                data: user,
                token: token

            })
        }


    })
    //for logout
route.post('/logout', async(req, res) => {


    res.cookie('access_token', null, { expires: new Date(Date.now()) });
    res.json({ message: "logged out successfully" });


})

//POST MODEL CRUD OPERATIONS BEGINS FROM HERE

route.post('/', verifytoken, async(req, res) => {

    const post = await new postmodel({
        title: req.body.title,
        _userid: req.id
    })

    post.save().then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})

route.get('/', verifytoken, async(req, res) => {
    postmodel.find({ _userid: req.id }).then((data) => {
        res.send(data);
    }).catch((err) => {
        res.send(err);
    })
})
route.get('/:id', verifytoken, async(req, res) => {
    let id = req.params.id;
    postmodel.findById(id).then((data) => {
        res.send(data);

    }).catch((err) => {
        res.send(err);
    })
})
route.put('/:id', verifytoken, async(req, res) => {
    let id = req.params.id;

    let post = await postmodel.findById(id)

    if (post._userid == req.id) {
        await postmodel.findByIdAndUpdate(id, req.body);
        await postmodel.findById(id).then((data) => {
            res.send(data);
        }).catch((err) => {
            res.send(err);
        })

    }
})
route.delete('/:id', verifytoken, async(req, res) => {
    let id = req.params.id;
    await postmodel.findByIdAndDelete(id).then((data) => {
        res.json({
            data,
            message: "deletion successfull"
        });
    }).catch((err) => {
        res.send(err);
    })
})
module.exports = route;