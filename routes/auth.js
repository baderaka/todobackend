const express = require('express');
const jwt = require('jsonwebtoken')

function verifytoken(req, res, next) {
    let token = req.cookies.access_token;
    if (!token)
        res.json({
            message: "no token available,first u need to login"
        })
    jwt.verify(token, "verysecret", (err, data) => {
        if (err) {
            res.send(err);

        } else {
            req.id = data.id;


        }
        next();
    })

}

module.exports = { verifytoken };