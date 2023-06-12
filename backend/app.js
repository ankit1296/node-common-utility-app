const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDb = require('./src/config/db');
var cors = require('cors');

// use it before all route definitions
app.use(cors({ origin: 'http://localhost:4200' }));

const compressRoute = require('../backend/src/routes/compress-image');
const shortenUrlRoute = require('../backend/src/routes/url-shorten');
const getOriginalUrl = require('../backend/src/routes/get-shorturl');


app.use('/compress', compressRoute);
app.use('/shorten', shortenUrlRoute);
app.use('/', getOriginalUrl);


// listen to the port
app.listen(PORT, () => {
    console.log('app started on port ', PORT);
    connectDb();
})