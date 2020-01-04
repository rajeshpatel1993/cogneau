exports.orderUpdate = function() {
const express = require("express");
const _ = require('lodash');
const request = require('request');
const router = express.Router();
const Crypto = require('crypto');
const {Trade} = require("../models/trade");
const config = require("../config/config");
const apiKey = config["bittrexapikey"].apikey;
const secret = config["bittrexapikey"].apiSecret;
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
                var jsonp = JSON.parse(body);
                // console.log(jsonp.result);
                let result =jsonp.result;
                // console.log(typeof result);
                for(var i=0;i<result.length;i++){
                    // console.log(result[i]);

                    var query = {"order_id": result[i].OrderUuid};
                    var update = {quantityRemaining: result[i].QuantityRemaining, commission:result[i].Commission, total_price:result[i].Price, executed_price:result[i].PricePerUnit,closed:result[i].Closed};
                    var options = {new: true};
                    Trade.findOneAndUpdate(query, update, options, function(err, person) {
                        if (err) {
                            console.log('got an error');
                        }

                        // at this point person is null.
                    });

                }
                // console.log(body);
                // return res.status(200).send(body);

            }
        }

        request(options, callback);

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

// console.log('hiii');
};

// module.exports = router;