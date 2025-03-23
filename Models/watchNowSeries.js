const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchNowSeriesSchema = new Schema({
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

const SeriesWatchNowModel = mongoose.model("SeriesWatchNow", watchNowSeriesSchema);
module.exports = SeriesWatchNowModel;