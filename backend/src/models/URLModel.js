const mongoose = require('mongoose');
const URLModel = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    urlId: {
        type: String,
        required: true
    },
    noOfTimeAccessed: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('UrlModel', URLModel);