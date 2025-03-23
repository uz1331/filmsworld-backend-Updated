const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
    SeasonId: {
        type: Schema.Types.ObjectId,
        ref: "TestSeason",
        required: true
    },
    episodeName:{
        type: String,
    },
    episodeNumber: {
        type: Number,
        required: true,
    },
    episodeURL:{
        type: String,
        required: true
    },
}); 

const episodeModel = mongoose.model("Episode", episodeSchema);
module.exports = episodeModel;