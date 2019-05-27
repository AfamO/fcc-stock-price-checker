'use strict';

const axios = require('axios');
const APIURL = 'https://api.iextrading.com/1.0/stock/';

const getStockPrice=  function (stock,done) {
    axios.get(APIURL+stock+"/price")
            .then(response => {
                console.log("Axios Price==="+response.data);
                done(null,response.data);
            })
            .catch(error => {
                console.log( { ERROR: 'Something went wrong while trying to access stock data. Please, try again. \n Error Details:: \n'+error} );
                //return { msg: 'Something went wrong while trying to access stock data. Please, try again.',status:500 };
                return done(error);
            });

};

exports.getStockPrice=getStockPrice;