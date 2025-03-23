const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const watchLaterSchema = new Schema({
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

const watchLaterModel = mongoose.model("WatchLater", watchLaterSchema);
module.exports = watchLaterModel;