const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieTitle:{
        type: String,
        required: true,
    },
    year:{
        type: Number,
        required: true,
    },
    genre:{
        type: [String],
        required: true,
    },
    releaseDate: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    directors: {
        type: [String],
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    plot: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    imdbId: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    country:{
        type: [String],
        required: true
    },
    poster: {
        type: String,
        required: true,
    },
    videoURL: {
        type: String,
    },
    trending:{
        type: Boolean,
        default: false
    }
});

const moviesModel = mongoose.model("Movie", movieSchema);
module.exports = moviesModel;
