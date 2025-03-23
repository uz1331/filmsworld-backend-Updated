const mongoose = require('mongoose')

const connectDB = ()=>{
    // const connect =  mongoose.connect("mongodb://127.0.0.1:27017")
    // 'mongodb+srv://filmsworldpkfilms:UEfWwpq6kzRSIs2u@cluster0.shsnl5p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    const connect = mongoose.connect("mongodb+srv://albertlobo80:bukhari1331@cluster0.6qqvk.mongodb.net/FilmsWorld");
    const db = mongoose.connection

    db.on("error", err=>console.log(err))
    db.once("open",()=>console.log("DB Connected"))
}

module.exports = connectDB