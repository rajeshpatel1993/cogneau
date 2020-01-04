const express = require("express");
const _ = require('lodash');
const request = require('request');
const util = require("../utils/helper");
const {User} = require("../models/user");
const {News} = require("../models/news");
const router = express.Router();
const config = require("../config/config");

//login
router.post("/login", async (req, res)=> {

    try {
        let username = req.body.username;
        let role = req.body.role;

    } catch (err) {
        return res.status(400).send(err);
    }

});



router.post("/gettraded", async (req, res)=> {

    try {
        let data = req.body;

        res.send(data);
        console.log(data);

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});

module.exports = router;