const jwt = require('jsonwebtoken')
const User = require('../Models/userModel');
const multer = require("multer");
const dotenv = require('dotenv')
dotenv.config()

var CheckUserAuth = async (req, res, next) => {
    let token
    const { authorization } = req.headers

    if (authorization && authorization.startsWith('Bearer')) {
        try {
            token = authorization.split(' ')[1]
            const DecodedToken = jwt.verify(token, process.env.AppToken)
            const id = DecodedToken.id
            req.user = await User.findById(id).select('-password')
            next()
        } catch (error) {
            console.log("error")
            res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }
    if (!token) {
        res.status(200).json({
            success: false,
            message: "Un Authorized Access"
        })
    }
};

const bannerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/banner");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now()+ "-" + file.originalname);
    }
});

const uploadBanner = multer({storage: bannerStorage});

module.exports = {
    CheckUserAuth,
    uploadBanner
}