const express = require('express');
const jwt = require('jsonwebtoken')

function verifytoken(req, res, next) {
    let authheader = req.headers['Authorization'];
    const bearertoken = authheader.split(' '); // this splits the token and bearer.that we set in the header of the browser
    const token = bearertoken[1]; // the 0th element is bearer then 1 st is our token
    if (!token)
        return res.json({
            message: "no token available,first u need to login"
        })
    jwt.verify(token, "verysecret", (err, data) => {
        if (err) {
            return res.send(err);

        } else {
            req.id = data.id;


        }
        next();

    })

}

module.exports = { verifytoken };