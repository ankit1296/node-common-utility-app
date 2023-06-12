const express = require('express');
const router = express.Router();
const UrlModel = require('../models/URLModel');
const baseUrl = process.env.BASE;
router.get('/:urlId', async function(req, res) {
    console.log('request received to get original url', req.url);
    try {
        const url = await UrlModel.findOne({ urlId: req.params.urlId });
        if (url && url.originalUrl) {
            await url.updateOne({
                urlId: req.params.urlId
            }, {
                $inc: { noOfTimeAccessed: 1 }
            });
            return res.redirect(url.originalUrl);
        } else {
            res.status(404).json('Not found');
        }
    } catch (e) {
        console.log('error occured while fetching original url', e);
        res.status(500).json('Internal Server Error');
    }
})


module.exports = router;