const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const config = require("./config/config");
const morgan = require("morgan");
const session = require('express-session')
const cors = require('cors');

//db configuration 
let db_host = config["db"].host;
let db_port = config["db"].port;
let db_name = config["db"].name;
let server_port = config["app"].port;

//mongo connection
mongoose.connect(`mongodb://rajesh:ai123456@ds051585.mlab.com:51585/delicious_rajesh`, { useNewUrlParser: true })
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
app.use(session({
    secret: "ai123",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.use(morgan('tiny')); // logs reqs meta data in console
app.use(bodyParser.json());


app.use('/api', homeController);


// console.log(`Your port is ${process.env.PORT}`);

app.listen(8081, () => {
    console.log('App listening on port 8081!')
});