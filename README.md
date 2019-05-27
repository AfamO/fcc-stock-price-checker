# FreeCodeCamp
#### Information Security & Quality Assurance Projects
---

All tests passed. Both client and server working as expected.

#### Try it out!

If you want to try the converter, open [this link on Glitch](https://afamo-stock-price-checker.glitch.me/).


##### Attribution

Data provided for free by [IEX](https://iextrading.com/developer). [View IEX’s Terms of Use](https://iextrading.com/api-exhibit-a/).

Best API I tried, by the way!

##### User Stories

1. Set the content security policies to only allow loading of scripts and css from your server.
2. I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
3. In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
4. I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
5. If I pass along 2 stocks, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference betwwen the likes) on both.
6. A good way to recieve current price is the following external API(replacing 'GOOG' with your stock): https://finance.google.com/finance/info?q=NASDAQ%3aGOOG (**nop, not working anymore**).
7. All 5 functional tests are complete and passing.

##### API Usage
```
/api/stock-prices?stock=goog
/api/stock-prices?stock=goog&like=true
/api/stock-prices?stock=goog&stock=msft
/api/stock-prices?stock=goog&stock=msft&like=true
```



---

[AfamO](https://ng.linkedin.com/in/okonkwo-afam-14103b84)