const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true,
        default:"null"
    },
})
const userModel = mongoose.model('User',UserSchema)
module.exports = userModel; 