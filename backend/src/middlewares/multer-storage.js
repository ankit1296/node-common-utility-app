const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'C:/Users/karve/Downloads/common-utility-project/backend/public/images');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
const uploadHandleStorage = multer({ storage: storage }).single('file');
module.exports = uploadHandleStorage;