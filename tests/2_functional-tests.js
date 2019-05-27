/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);


suite('Functional Tests', function() {

    this.timeout(18500);
    suite('GET /api/stock-prices => stockData object', function() {

      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
           console.log("My Functional Test Result=="+JSON.stringify(res.body));
          assert.equal(res.status,200);
          assert.equal(res.body.stockData.stock,'GOOG');
          assert.property(res.body.stockData,'likes','Likes is a property of the returned body');
          done();
        });
      });


      test('1 stock with like', function(done) {
          chai.request(server)
              .get('/api/stock-prices')
              .query({stock: 'msft',like: true
              })
              .end(function(err, res){
                  console.log("My Functional Test Result=="+JSON.stringify(res.body));
                  assert.equal(res.status,200);
                  assert.equal(res.body.stockData.stock,'MSFT');
                  assert.property(res.body.stockData,'likes','Likes is a property of the returned body');
                  assert.isAtLeast(res.body.stockData.likes,1,"Likes must be grater or equal to 1");
                  done();

              });
      });

      test('1 stock with like again (ensure likes arent double counted)', function(done) {

          chai.request(server)
              .get('/api/stock-prices')
              .query({stock: 'msft',like: true
              })
              .end(function(err, res){
                  console.log("My Functional Test Result=="+JSON.stringify(res.body));
                  assert.equal(res.status,200);
                  assert.equal(res.body.stockData.stock,'MSFT');
                  assert.property(res.body.stockData,'likes','Likes is a property of the returned body');
                  assert.equal(res.body.stockData.likes,1,"Likes must be 1 per Ip");
                  assert.isAtLeast(res.body.stockData.likes,1,"Likes must be grater or equal to 1");
                  done();

              });
      });

      
      test('2 stocks', function(done) {

          chai.request(server)
              .get('/api/stock-prices')
              .query({stock: 'goog',anotherStock:'msft'
              })
              .end(function(err, res){
                  console.log("My Functional Test Result=="+JSON.stringify(res.body));
                  assert.equal(res.status,200);
                  assert.isArray(res.body.stockData,'It must be an array');
                  assert.property(res.body.stockData[0],'relikes','reLikes is a property of the returned body');
                  done();

              });
      });
      
      test('2 stocks with like', function(done) {

          chai.request(server)
              .get('/api/stock-prices')
              .query({stock: 'goog',anotherStock:'msft',like: true
              })
              .end(function(err, res){
                  console.log("My Functional Test Result=="+JSON.stringify(res.body));
                  assert.equal(res.status,200);
                  assert.isArray(res.body.stockData,'It must be an array');
                  assert.property(res.body.stockData[0],'relikes','reLikes is a property of the returned body');
                  done();

              });
      });

    });

});
