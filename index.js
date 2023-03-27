const { request } = require('express');
const express = require('express');
const res = require('express/lib/response');

//used to make api requests//
const express = require('request-promise');

//initialize app//
const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = '66ef39a175c19873142ee2a1895511d6';
//const generateScraperUrl(apiKey) = `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

const generateScraperUrl = (apiKey) => `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//allows our app to pass json input//
app.use(express.json());

/*route*/
app.get('/', (req, res) => {
    //message that lets us know api is running//
    res.send('Welcome to Amazon Scrapper API.')
});

//fetching product details
app.get('/product/:productId', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


//fetching product reviews
app.get('/product/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//fetching product offers
app.get('/product/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/gp/offers-listing/${productId}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});


//fetching search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${generateScraperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});
//to start the server//
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));