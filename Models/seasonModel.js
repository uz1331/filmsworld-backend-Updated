const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seasonSchema = new Schema({
    seriesId: {
        type: Schema.Types.ObjectId,
        ref: "Series",
        required: true
    },
    seasonName:{
        type: String,
    },
    seasonNumber: {
        type: Number,
        required: true,
    }
}); 

const seasonModel = mongoose.model("Season", seasonSchema);
module.exports = seasonModel;