const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const storageHandle = require('../middlewares/multer-storage');



router.post('/', storageHandle, function(req, res) {
    console.log('Request received for compression', req.file);
    let format;
    let img;
    sharp(`${req.file.destination}/${req.file.originalname}`).metadata().then((item) => {
        console.log('format: ', item.format);
        if (item) {
            format = item.format;
            if (format === 'jpg' || format === 'jpeg') {
                img = sharp(`${req.file.destination}/${req.file.originalname}`).
                jpeg({ progressive: true, force: false, quality: 20 });
                img.toFile(`${req.file.destination}/${req.file.originalname}compressed.${format}`).then((data) => {
                    res.sendFile(`${req.file.destination}/${req.file.originalname}compressed.${format}`);
                })
            } else if (format === 'png') {
                img = sharp(`${req.file.destination}/${req.file.originalname}`).
                png({ progressive: true, force: false, quality: 3 });
                img.toFile(`${req.file.destination}/${req.file.originalname}compressed.${format}`).then((data) => {
                    res.send(data);
                })
            } else if (format === 'gif') {
                img = sharp(`${req.file.destination}/${req.file.originalname}`).
                gif({ progressive: true, force: false, quality: 20 });
                img.toFile(`${req.file.destination}/${req.file.originalname}compressed.${format}`).then((data) => {
                    res.send(data);
                })
            }
        }
    })
});



module.exports = router;