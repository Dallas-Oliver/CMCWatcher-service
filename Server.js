const express = require("express");
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
const cmcHost = "https://pro-api.coinmarketcap.com"


//get all coins data
app.get("/latest", async (request, response) => {
    const res = await fetch(`${cmcHost}/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }

    });
    const json = await res.json();


    response.send(json)
});

app.get("/latest/:coinSlug", async (request, response) => {
    const slug = request.params.coinSlug;

    const res = await fetch(`${cmcHost}/v1/cryptocurrency/listings/latest?cryptocurrency_type=coins`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });
    const mainJson = await res.json();

    const coinLogoRes = await fetch(`${cmcHost}/v1/cryptocurrency/info?slug=${slug}`, {
        "method": "GET",
        "headers": {
            "X-CMC_PRO_API_KEY": apiKey
        }
    });
    console
    const logoJson = await coinLogoRes.json();
    const coinData = mainJson.data.filter(coinData => coinData.slug === slug);
    response.send({coinData, logoJson});


})

app.listen(3000, () => {
 console.log(`listening on port ${port}`)
})