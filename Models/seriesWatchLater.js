const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seriesWatchLaterSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    seriesId: {
        type: Schema.Types.ObjectId,
        ref: "Series",
        required: true
    }
});

const seriesWatchLaterModel = mongoose.model("SeriesWatchLater", seriesWatchLaterSchema);
module.exports = seriesWatchLaterModel;