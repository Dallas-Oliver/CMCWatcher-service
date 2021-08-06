const express = require("express");
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const cmcHost = "https://pro-api.coinmarketcap.com"

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//get 10 coins data sorted by price in ascending order
app.post("/latest", async (request, response) => {
    const sortBy = request.body.sortBy;
    const sortDir = request.body.sortDir;
    const limit = request.body.limit;
    const res = await fetch(`${cmcHost}/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins&sort=${sortBy}&sort_dir=${sortDir}&limit=${limit}`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });
    const json = await res.json();

    response.json(json.data);
});

//get data for specific coin
app.get("/latest/:coinName", async (request, response) => {
    const coinName = request.params.coinName;

    const res = await fetch(`${cmcHost}/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });
    const mainJson = await res.json();

    const coinLogoRes = await fetch(`${cmcHost}/v1/cryptocurrency/info?slug=${coinName}`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });
    console
    const logoJson = await coinLogoRes.json();
    const coinData = mainJson.data.filter(coinData => coinData.slug === coinName);
    response.send({coinData, logoJson});


})

app.listen(3000, () => {
 console.log(`listening on port ${port}`)
})