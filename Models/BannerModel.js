const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
    Banner:{
        type:String,
        required:true
    },

})
const bannerModel = mongoose.model('Banner',BannerSchema)
module.exports = bannerModel;
