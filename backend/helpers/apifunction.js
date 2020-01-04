const request = require('request');
const config = require('config');

const coinApiUrl = config.get('coinApiUrl');
const coinApiKey = config.get('coinApiKey');

var apiFunction = {};


apiFunction.call = function(urlPath, return_string = false) {
    return new Promise(function(resolve, reject) {
        console.log("Calling: " + coinApiUrl + urlPath);
        if(urlPath.indexOf("?")>0) {
            urlPath += "&randomNumber=" + Math.random();
        } else {
            urlPath += "?randomNumber=" + Math.random();
        }
        request(
            { url: coinApiUrl + urlPath, json: return_string ? false : true, headers: { "X-CoinAPI-Key": coinApiKey}, timeout: 180000 },
            function(error, response, body){
                if (!error && response && response.statusCode == 200) {
                    console.log("Success while calling: " + coinApiUrl + urlPath);
                    resolve(body);
                } else {
                    console.log("Error while calling: " + coinApiUrl + urlPath);
                    reject({"error": error, "body": body, "statusCode": response && response.statusCode? response.statusCode:null});
                }
            }
        );
    });
};


coinApi.getAllExchanges = function() {
    return this.call("exchanges");
};

coinApi.getAllAssets = function() {
    return this.call("assets");
};

coinApi.getAllSymbols = function() {
    return this.call("symbols");
};

coinApi.getHistoryData = function(type, asset_id_base, asset_id_quote, exchange_id, symbol_type, start_date, end_date) {
    return this.call(type + "s/"+ exchange_id +"_"+symbol_type+"_"+asset_id_base +"_"+ asset_id_quote+"/history?time_start="+start_date+"&time_end="+end_date+"&limit=100000");
};

module.exports = coinApi;