const express = require('express');
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
// import {orderUpdate} from "./controllers/orderUpdate";
// const config = require('config');
//const AWS = require('aws-sdk');
const config = require("./config/config");

let db_host = config["db"].host;
let db_port = config["db"].port;
let db_name = config["db"].name;
let server_port = config["app"].port;
// console.log(host);

mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, { useNewUrlParser: true })
    .then(()=> console.log('connected to Mongodb..'))
    .catch((err) => {
        console.log("unable to connect to the database: ",err);
        process.exit();
        throw err;
    });
mongoose.set('useCreateIndex', true);


// if(config.get("storeInMongo")) {
//     mongoose.connect("mongodb://localhost:27017/black-rabbit", { useNewUrlParser: true })
//         .then(()=> console.log('connected to Mongodb..'))
//         .catch((err) => {
//             console.log("unable to connect to the database: ",err);
//             process.exit();
//             throw err;
//         });
//     mongoose.set('useCreateIndex', true);
// }
//
// if(config.get("storeInS3")) {
//     AWS.config.accessKeyId = config.get("awsAccessKey");
//     AWS.config.secretAccessKey = config.get("awsSecretAccessKey");
//     AWS.config.region = config.get("awsRegion");
//     //const s3Bucket = new AWS.S3({params: {Bucket: config.get("awsS3Bucket")}});
//     console.log("AWS config initialized.");
// }

//Include controllers
// const exchangeDataController = require("./controllers/exchange");
// const cryptoDataController = require("./controllers/crypto");

const tradeController = require("./controllers/trade");
const orderController = require("./controllers/order");
const cancelController = require("./controllers/cancel");
const accountController = require("./controllers/account");
const orderUpdateController = require("./controllers/orderUpdate");
orderUpdateController.orderUpdate();

const binanceController = require("./controllers/binance");
const krakenController = require("./controllers/kraken");

const app = express();
app.use(cors());
app.use(helmet()); // better status code
app.use(morgan('tiny')); // logs reqs meta data in console
app.use(bodyParser.json());

// app.get('/', (req, res) => {
//     res.send('Hello World')
// });

// app.use('/api/list', exchangeDataController);
// app.use('/api/list', cryptoDataController);


app.use('/api/bittrex/trade', tradeController);
app.use('/api/bittrex/order', orderController);
app.use('/api/bittrex/order', cancelController);
app.use('/api/bittrex/account', accountController);
app.use('/api/binance', binanceController);
app.use('/api/kraken',krakenController);


// console.log(`Your port is ${process.env.PORT}`);

app.listen(8081, () => {
    console.log('App listening on port 8081!')
});