const express = require("express");
const Joi = require("joi");
const _ = require('lodash');
const request = require('request');
// const {Order} = require("../models/order");
const router = express.Router();
const Crypto = require('crypto');
const CryptoJS = require("crypto-js");


const config = require("../config/config");
const apiKey = config["bittrexapikey"].apikey;
const secret = config["bittrexapikey"].apiSecret;
const binance_apikey = config["binanceapikey"].apiKey;
const binance_apiSecret = config["binanceapikey"].apiSecret;


const binance = require('node-binance-api')().options({
    APIKEY: binance_apikey,
    APISECRET: binance_apiSecret,
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

router.get("/getbalance", async (req, res)=> {

    try {
        let currentNonce = Math.floor(new Date() / 1000);
        const message = "https://api.bittrex.com/api/v1.1/account/getbalances?apikey="+apiKey+"&nonce="+currentNonce;
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


router.post("/depositAddress", async (req, res)=> {
let {asset} = req.body;
    try {
        const timestamp = new Date().getTime();
        let content = "";
        let contentHash = CryptoJS.SHA512(content).toString(CryptoJS.enc.Hex);
        let subaccountId = "";
        let uri = "https://api.bittrex.com/v3/addresses/"+asset;
        let method = "GET";
        let preSign = [timestamp, uri, method, contentHash, subaccountId].join('');
        let signature = CryptoJS.HmacSHA512(preSign, secret).toString(CryptoJS.enc.Hex);

        var options = {
            url: uri,
            headers: {
                'Api-Key':apiKey,
                'Api-Timestamp': timestamp,
                'Api-Content-Hash': contentHash,
                'Api-Signature': signature,
                'apisign': signature,
                'Content-Type':'application/json'
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



router.get("/getOrderHistory", async (req, res)=> {

    try {
        let currentNonce = Math.floor(new Date() / 1000);
        const message = "https://api.bittrex.com/api/v1.1/account/getorderhistory?apikey="+apiKey+"&nonce="+currentNonce;
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



router.get("/binance/getballance", async (req, res)=> {

    try {

        binance.balance((error, balances) => {
            if ( error ) return console.error(error);
            if (!error && res.statusCode == 200) {
                return res.status(200).send(balances);

            }
          });

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});






module.exports = router;