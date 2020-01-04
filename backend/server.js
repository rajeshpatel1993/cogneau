const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require("./config/config");
const morgan = require("morgan");

//db configuration 
let db_host = config["db"].host;
let db_port = config["db"].port;
let db_name = config["db"].name;
let server_port = config["app"].port;

//mongo connection
mongoose.connect(`mongodb://${db_host}:${db_port}/${db_name}`, { useNewUrlParser: true })
    .then(()=> console.log('connected to Mongodb..'))
    .catch((err) => {
        console.log("unable to connect to the database: ",err);
        process.exit();
        throw err;
    });
mongoose.set('useCreateIndex', true);

//import controllers
const homeController = require("./controllers/home");

const app = express();
app.use(cors());
app.use(morgan('tiny')); // logs reqs meta data in console
app.use(bodyParser.json());


app.use('/api', homeController);


// console.log(`Your port is ${process.env.PORT}`);

app.listen(8081, () => {
    console.log('App listening on port 8081!')
});