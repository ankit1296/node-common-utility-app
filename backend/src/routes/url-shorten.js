const express = require('express');
const router = express.Router();
const shorten = require('nanoid');
const mongoose = require('mongoose');
const UrlModel = require('../models/URLModel');
const baseUrl = process.env.BASE;





router.post('/', async function(req, res) {
    console.log('Request received for shortening url', req.query, shorten.nanoid());
    const originalUrl = req.query && req.query.url;
    if (originalUrl) {
        try {
            const existingUrl = await UrlModel.findOne({ originalUrl: originalUrl });
            if (existingUrl && existingUrl.shortUrl) {
                res.status(200).send(existingUrl.shortUrl);
            }
            const urlId = shorten.nanoid();
            const shortUrl = `${baseUrl}/${urlId}`;
            const url = new UrlModel({ originalUrl, urlId, shortUrl, noOfTimeAccessed: 0 });
            await url.save();
            res.status(200).send(shortUrl);

        } catch (e) {
            console.log('Error occured: ', e);
            res.status(500).send('Error occured while shortening url')
        }
    } else {
        res.status(500).send('url parameter not found');
    }


});





module.exports = router;