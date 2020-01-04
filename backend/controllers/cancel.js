const express = require("express");
const Joi = require("joi");
const _ = require('lodash');
const request = require('request');
// const {Order} = require("../models/order");
const router = express.Router();
const Crypto = require('crypto');
const config = require("../config/config");
const apiKey = config["bittrexapikey"].apikey;
const secret = config["bittrexapikey"].apiSecret;
router.get("/cancel", async (req, res)=> {


    try {
        let orderId= req.param('orderId');
        let currentNonce = Math.floor(new Date() / 1000);
        const message = "https://api.bittrex.com/api/v1.1/market/cancel?apikey="+apiKey+"&uuid="+orderId+"&nonce="+currentNonce;
        const signature = Crypto.createHmac('sha512', secret)
            .update(message)
            .digest('hex');
// let returnarr = {"status" : true, "message":"successfully placed"};

        var options = {
            url: message,
            headers: {
                'apisign': signature
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                return res.status(200).send(body);

            }
        }

        request(options, callback);

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});



module.exports = router;