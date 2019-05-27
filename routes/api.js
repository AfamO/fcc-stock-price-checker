/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var MongoClient = require('mongodb').MongoClient;
const assert    = require('assert');
const CONNECTION_STRING = process.env.DB;
const client = new MongoClient();
var DBApp         = require('../controller/DBApp.js');
var StockHandler = require('../controller/stockHandler.js');

var stockPrices = StockHandler;

const dbApp= DBApp;

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get( function (req, res){
        const options= {
                poolSize:20,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000
        };
            MongoClient.connect(CONNECTION_STRING, options,function(err, db) {
            if (err)
            {
                res.json({msg:"Ooops Failed to process your stock request. Internal Problem Contact Admin",status:500});
                console.log("Connection to DB Server Server Failed");
            }
            console.log("Connected successfully to DB Server");
            main(req,res,db);

        });


    });
    
};
   function main(req,res,db) {
    let stock= req.query.stock;
    let anotherStock=(req.query.anotherStock!==null)? req.query.anotherStock : null;
    if(stock==null)
    {
        res.json({msg:"Ooops please provide stock name",status:500});
    }
    else {
        stock=stock.toUpperCase();
        let firstStockData=null;
        let ip=req.headers.host.split(':')[0];
        console.log("Ip=="+ip);
            processStock(stock,req,db,function (err,result) {
            if(err)
            {
                res.json({msg:"Ooops Failed to process your first stock request",status:500});
            }
            else {
                firstStockData=result;
                delete firstStockData["_id"];
                delete firstStockData["ip"];
                if(anotherStock==null){
                    res.json({stockData: firstStockData});
                }
                else{
                    anotherStock=anotherStock.toUpperCase();
                    let stockArrays= [];
                    let secondStockData=null;
                    processStock(anotherStock,req,db,function (err,result) {
                        if(err)
                        {
                            res.json({msg:"Ooops Failed to process your second stock request",status:500});
                        }
                        else {
                            secondStockData=result;
                            //console.log("Second Stock Data=="+JSON.stringify(result));
                            delete secondStockData["_id"];
                            delete secondStockData["ip"];
                            firstStockData.relikes=firstStockData.likes-secondStockData.likes;
                            secondStockData.relikes=secondStockData.likes-firstStockData.likes;
                            const keys = "likes";
                            delete firstStockData[keys];
                            delete secondStockData[keys];
                            stockArrays.push(firstStockData);
                            stockArrays.push(secondStockData);
                            res.json({stockData:stockArrays});
                        }
                    });

                }
            }

        });

    }
}


const processStock=function (stock,req,db,done) {
    let price=null;
    let likes=(req.query.like=="true")? true : false;
    let ip=req.headers.host.split(':')[0];// get the current user Ip
         stockPrices.getStockPrice(stock,function (err,data) {
          if(err)
              return done(err);
          price=data;
             let stockData={
                 stock:stock,
                 price:price,
                 likes:0,
                 ip:ip
             };

             dbApp.findStockData(db,stock,function (err,data) {
                 if(data!=null){
                     let currentLike= data.likes;
                     if(ip==="localhost")
                         ip="127.0.0.1";
                     if(likes)//Ensure that it is from different ip
                     {
                         if(data.likes===0)
                         {
                             currentLike++;
                             data.likes=currentLike;
                             data.ip=ip
                         }
                         else if(ip!==data.ip) {
                             currentLike++;
                             data.likes=currentLike;
                             data.ip=ip
                         }


                     }
                     data.price=price;
                     dbApp.updateStockData(db,data,function (err,updatedData) {
                         if(err)
                             return done(err);
                         else {
                             done(null,data);
                         }
                     })
                 }
                 else {
                     if (likes)
                     {
                         stockData.likes=1;
                     }
                     dbApp.createStockData(db,stockData,function (err,data) {
                         if(err)
                             return done(err);
                         console.log("Good Inserted New Stock!!\n Result=="+JSON.stringify(data));
                         done(null,stockData);
                     });
                 }
             });
      });

};
