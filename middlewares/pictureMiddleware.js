const multer = require('multer')
const path = require('path')
const pathToPicture = path.resolve(__dirname, '../images')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: 'ddxjaj6xv',
    api_key: '316971391331839',
    api_secret: 'azVSB-LMZCqghc3IOzo8LQIn860'
});

const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage: cloudStorage });

module.exports = { upload }
