// src/middleware/authenticate.js
const jwt = require('jsonwebtoken');
const Admin = require("../models/admin");
const { promisify } = require('util')


// Check token is present
const auth = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization;
        }
        if (!token) {
            return res.status(401).json({ status: false, message: "You are not logged in! Please login in to continue" });
        }
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        // Check if the admin is exist (not deleted)
        const admin = await Admin.findById(decode.username);
        if (!admin) {
            return res.status(401).json({ status: false, message: "You are not authorized user" });
        }
        req.admin = admin;
        next();
    } catch (err) {
        return res.status(401).json({ status: false, message: "invalid token" });
    }
};

module.exports = auth;
