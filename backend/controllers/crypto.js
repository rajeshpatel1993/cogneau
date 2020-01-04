const express = require("express");
const {Crypto} = require("../models/crypto");
const router = express.Router();

router.get("/crypto", async (req, res)=> {

    try {


         // Crypto.create([{
         //    crypto_symbol: 'BTC',
         //    name: "BTC-USD"
         // }, {
         //     exchange_symbol: 'BTC',
         //     name: "BTC-XRP"
         // },
         //     {
         //         exchange_symbol: 'BTC',
         //         name: "BTC-BCH"
         //     },
         //
         //     {
         //         exchange_symbol: 'BTC',
         //         name: "BTC-ETH"
         //     },
         //     {
         //         exchange_symbol: 'ETH',
         //         name: "ETH-USD"
         //     },
         //     {
         //         exchange_symbol: 'ETH',
         //         name: "ETH-BTC"
         //     }
         //
         // ])
         //     .then(crypto => {
         //         console.log(`${crypto.length} Crypto created`);
         //     })
         //     .catch((err) => {
         //         console.log(err);
         //     });
        var cryptoData = {};

        const crypto = await function() {

            Crypto.find({},function(err, cryptos) {
                if (err)
                    return res.status(400).send(err);
                cryptoData.status = 200;
                cryptoData.data = cryptos;
                return res.status(200).json(cryptoData);
            });

           // return res.status(200).send("successfully");
        }();

    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }

});




module.exports = router;