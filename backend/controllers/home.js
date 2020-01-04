const express = require("express");
const _ = require('lodash');
const request = require('request');
const {User} = require("../models/user");
const {News} = require("../models/news");
const router = express.Router();
const config = require("../config/config");
const mongoose = require('mongoose');

//login
router.post("/login", async (req, res)=> {

    try {
        let username = req.body.username;
        let role = req.body.role;
        req.session.role = role;
        res.send(req.session.role);
    } catch (err) {
        return res.status(400).send(err);
    }

});



router.post("/getSearch", async (req, res)=> {

    try {
        let {searchText, startDate, endDate} = req.body;
        let formattedStartDate = new Date(startDate).toISOString();
        let formattedEndDate = new Date(endDate).toISOString();
        let db = mongoose.connection;
        // const testDb = conn.db.db('delicious_rajesh');  // For example,  get "test" as a sibling
       let data =  await db.collection('news').find({"posts.thread.title":'Auto sales: PV sales up 6.25% at 313,061 units in November: VAHAN, Auto News, ET Auto'},{posts:1,_id:0}).toArray();
        // let data = await News.find({"posts.thread.replies_count":0});
        console.log(data);


    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});

module.exports = router;