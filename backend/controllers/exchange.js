const express = require("express");
const Joi = require("joi");
const _ = require('lodash');
const {Exchange} = require("../models/exchange");
const router = express.Router();

router.get("/exchanges", async (req, res)=> {

    try {

       // Exchange.collection.drop();
       //  Exchange.create([{
       //      exchange_symbol: 'BIN',
       //     name: "BINANCE"
       //  }, {
       //      exchange_symbol: 'CBASE',
       //      name: "COINBASE"
       //  },
       //      {
       //          exchange_symbol: 'BIT',
       //          name: "BITMEX"
       //      },
       //
       //      {
       //          exchange_symbol: 'BITT',
       //          name: "BITTREX"
       //      },
       //      {
       //          exchange_symbol: 'BITF',
       //          name: "BITFINEX"
       //      },
       //      {
       //          exchange_symbol: 'OK',
       //          name: "OKEX"
       //      }
       //
       //  ])
       //      .then(exchange => {
       //          console.log(`${exchange.length} Exchange created`);
       //      })
       //      .catch((err) => {
       //          console.log(err);
       //      });

        var exchangeData = {};

        const exchanges = await function() {

            Exchange.find({},function(err, exchanges) {
                if (err)
                    return res.status(400).send(err);
                exchangeData.status = 200;
                exchangeData.data = exchanges;
                return res.status(200).json(exchangeData);
            });

            //return res.status(200).send("successfully");
        }();

        // if(config.get("storeInMongo")) {
        //     await Exchange.create(exchanges);
        // }
        // if(config.get("storeInS3")) {
        //     await s3.uploadMeta("exchanges.json", JSON.stringify(exchanges));
        // }
        // res.send({"message": "Exchanges saved!"});
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});

//
// router.get("/assets", async (req, res)=> {
//
//     try {
//         const assets = await coinApi.getAllAssets();
//         if(config.get("storeInMongo")) {
//             await Asset.create(assets);
//         }
//         if(config.get("storeInS3")) {
//             await s3.uploadMeta("assets.json", JSON.stringify(assets));
//         }
//         res.send({"message": "Assets saved!"});
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send(err);
//     }
// });
//
// router.get("/symbols", async (req, res)=> {
//     req.setTimeout(1200000);
//
//     try {
//         const symbols = await coinApi.getAllSymbols();
//         if(config.get("storeInMongo")) {
//             await Symbol.create(symbols);
//         }
//         if(config.get("storeInS3")) {
//             console.log("stringifying..");
//             let data = JSON.stringify(symbols);
//             console.log("stringify done. now uploading");
//             await s3.uploadMeta("symbols.json", data);
//             console.log("uploading done.");
//         }
//         console.log("sending response");
//         res.send({"message": "Symbols saved!"});
//     } catch (err) {
//         console.log(err);
//         return res.status(400).send(err);
//     }
// });


module.exports = router;