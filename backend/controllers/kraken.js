const express = require("express");
const Joi = require("joi");
const _ = require('lodash');
const request = require('request');
// const {Order} = require("../models/order");
const router = express.Router();
const Crypto = require('crypto');
const config = require("../config/config");
const kraken_apikey = config["krakenapikey"].apiKey;
const kraken_apiSecret = config["krakenapikey"].apiSecret;
const util = require("../utils/helper");
const KrakenClient = require('../kraken');

const kraken = new KrakenClient(kraken_apikey,  kraken_apiSecret);


// const binance = require('node-binance-api')().options({
//     APIKEY: binance_apikey,
//     APISECRET: binance_apiSecret
//     // useServerTime: true // If you get timestamp errors, synchronize to server time at startup
// });

router.get("/getballance", async (req, res)=> {
    // console.log('hiiii');
    // console.log(kraken_apikey,kraken_apiSecret);
    try {

       let balances =  await kraken.api('Balance');
    //    console.log('reached');
    //    return res.status(200).send(balances);
        // binance.useServerTime(() => {
        // binance.balance((error, balances) => {
        //     if (!error && res.statusCode == 200) {
        //         return res.status(200).send(balances);

        //     }else{
        //         return res.status(res.statusCode).send(error);
        //     }
        //   });
        // });

    } catch (err) {
        // console.log(err);
         return res.status(400).send(err);
    }

});


// router.post("/depositAddress", async (req, res)=> {
//     let {asset} = req.body;
//     try {

//         binance.depositAddress("ETH", (error, response) => {
//             if (!error && res.statusCode == 200) {
//                 return res.status(200).send(response);

//             }else{
//                 return res.status(res.statusCode).send(error);
//             }
//           });

//     } catch (err) {
//         // console.log(err);
//         return res.status(400).send(err);
//     }

   

// });



// router.post("/withdraw", async (req, res)=> {
//     let {asset,amount, address, tag} = req.body;

//     try {

//         if(tag){
//             binance.withdraw(asset, address, 1, tag, (error, response) => {
//                 if (!error && res.statusCode == 200) {
//                     return res.status(200).send(response);
    
//                 }else{
//                     return res.status(res.statusCode).send(error);
//                 }
//               });
//         }else{

//             binance.withdraw(asset, address, 1, false, (error, response) => {
//                 if (!error && res.statusCode == 200) {
//                     return res.status(200).send(response);
    
//                 }else{
//                     return res.status(res.statusCode).send(error);
//                 }
//               });


//         }
        

//     } catch (err) {
//         // console.log(err);
//         return res.status(400).send(err);
//     }

// });





// router.post("/maketrade", (req,res)=>{
//     let {from_coin,to_coin,price:[price],quantity:[quantity],from_exchange,to_exchange,order_type} = req.body;

//     let qty_f = util.convertExponentialToDecimal(quantity);
//     let price_f = util.convertExponentialToDecimal(price);
//     console.log(price_f);
//     console.log(typeof price_f);
//     console.log(price_f);

//     var tmpResult = {};
//     // tmpResult["status"] = true;
//     // tmpResult["message"] = "successfully placed";

//     console.log(qty_f, price_f);

//     if(order_type === "buy"){
//         binance.buy(to_coin+from_coin, quantity, price, {type:'LIMIT'}, (error, response) => {
//             if (!error && res.statusCode === 200) {

//                 return res.status(200).send(response);

//             }else{
//                 return res.status(res.statusCode).send(error);
//             }
//             // console.log("Limit Buy response", response);
//             // console.log("order id: " + response.orderId);
//         });

//     }else{

//         binance.sell(to_coin+from_coin, quantity, price, {type:'LIMIT'}, (error, response) => {
//             // tmpResult["orderId"] = response["clientOrderId"];
//             if (!error && res.statusCode === 200) {
//                 return res.status(200).send(response);

//             }else{
//                 return res.status(res.statusCode).send(error);
//             }

//             // console.log("Limit Buy response", response);
//             // console.log("order id: " + response.orderId);
//         });


//     }
// });


// router.get("/getopenorder", (req,res)=>{
//     let market= req.param('market');

//     binance.openOrders(market, (error, openOrders, symbol) => {

//         if (!error && res.statusCode == 200) {
//             return res.status(200).send(openOrders);

//         }else{
//             return res.status(res.statusCode).send(error);
//         }

//         // console.log("openOrders("+symbol+")", openOrders);
//     });
// });


// router.get("/cancelorder", (req,res)=>{
//     let market= req.param('market');
//     let orderId = req.param('orderId');
//     binance.cancel(market, orderId, (error, response, symbol) => {
//         if (!error && res.statusCode == 200) {
//             return res.status(200).send(response);

//         }else{
//             return res.status(res.statusCode).send(error);
//         }


//         // console.log(symbol+" cancel response:", response);
//     });



// });





module.exports = router;