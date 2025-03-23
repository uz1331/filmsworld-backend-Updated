const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchNowSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movieId: {
        type: Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    }
});

const watchNowModel = mongoose.model("MovieWatchNow", watchNowSchema);
module.exports = watchNowModel;