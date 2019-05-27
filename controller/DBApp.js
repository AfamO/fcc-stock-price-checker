var expect = require('chai').expect;





const createStockData= function (db,stockInfo,done) {
  const collection = db.collection('stockData')
    collection.insertOne(stockInfo,function (err,data) {
        if(err)
            return done(err);
        //console.log("Inserted new stockData to the DB");
        done(null,data);

    });
};
const findStockData= function(db,stock,done){

    const collection = db.collection('stockData');
    collection.findOne({stock:stock},function (err,data) {
        if(err)
        {
            return done(err);
        }
        done(null,data);
    });
};

const updateStockData= function(db,newData,done){

    const collection = db.collection('stockData');
    collection.updateOne({stock:newData.stock},{$set:newData},function (err,data) {
        if(err)
            return done(err);
        done(null,data);
    });
};

exports.createStockData = createStockData;
exports.findStockData =   findStockData;
exports.updateStockData =  updateStockData