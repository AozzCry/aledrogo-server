const multer = require('multer');
const path = require('path');

const { v4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/productPhotos');
    },
    filename: (req, file, cb) => {
        cb(null, v4() + file.originalname.slice(-4));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    },
}).array('productPhotos', 10);

module.exports = {
    storage,
    upload,
};
