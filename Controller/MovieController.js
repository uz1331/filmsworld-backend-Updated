const moviesModel = require("../Models/movieModel");
const seriesModel = require("../Models/seriesModel");
const watchNowMovie = require("../Models/watchNowMovie");
const watchNowSeries = require("../Models/watchNowSeries");


class movieController {

    static AddMovieTesting = async (req, res) => {
        try {
            const { imdbId } = req.body;
            console.log("ImdbId :", imdbId);
            const exist = await moviesModel.findOne({ imdbId: imdbId });
            if (exist) {
                return res.status(403).json({
                    success: false,
                    message: "Movie ALready Exist!"
                })
            } else {
                const NewMovie = new moviesModel(req.body);
                const result = await NewMovie.save();
                return res.status(200).json({
                    success: true,
                    message: "Movie Added Successfully!",
                    data: result
                })
            }
        } catch (error) {
            console.log("Error :", error);
            res.status(400).json({
                success: false,
                message: `Movie Not Added ${error.message}`
            })
        };
    };

    static getMovieById = async (req, res) => {
        try {
            const { movieId } = req.query;
            const movie = await moviesModel.findById(movieId);
            return res.status(200).json({
                success: true,
                message: "Movie Details!",
                data: movie
            })
        } catch (error) {
            console.log("Error :", error);
            res.status(400).json({
                success: false,
                message: `Can not get Movie ${error.message}`
            })
        }
    };

    static deleteMovie = async (req, res) => {
        try {
            const { movieId } = req.query;
            const movie = await moviesModel.findByIdAndDelete(movieId);
            return res.status(200).json({
                success: true,
                message: "Movie Deleted!",
            });
        } catch (error) {
            console.log("Error :", error);
            res.status(400).json({
                success: false,
                message: `Can not get Movie ${error.message}`
            });
        }
    };

    static getAllMovies = async (req, res) => {
        try {
            const movies = await moviesModel.find();
            return res.status(200).json({
                success: true,
                message: "All Movies!",
                data: movies
            })
        } catch (error) {
            console.log("Error :", error);
            res.status(400).json({
                success: false,
                message: `Can not get Movie ${error.message}`
            })
        }
    }

    static GetAllMoviesByGenre = async (req, res) => {
        try {
            const { genre } = req.query;
            console.log('Genre:', genre);

            // Find movies where genre array contains a case-insensitive match
            const movies = await moviesModel.find({
                genre: { $elemMatch: { $regex: genre, $options: 'i' } }
            });
            if (movies.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "No Movies Found!",
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All movies by genre",
                    data: movies
                });
            }
        } catch (error) {
            console.error("Error fetching movies by genre:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static GetAllHollywoodMovies = async (req, res) => {
        try {

            // Find movies where genre array contains a case-insensitive match
            const movies = await moviesModel.find({
                country: { $elemMatch: { $regex: "United States", $options: 'i' } }
            });
            if (movies.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "No Hollywood Movies Found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All Hollywood movies",
                    data: movies
                });
            }
        } catch (error) {
            console.error("Error fetching movies by genre:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static GetAllBollywoodMovies = async (req, res) => {
        try {
            ;

            // Find movies where genre array contains a case-insensitive match
            const movies = await moviesModel.find({
                country: { $elemMatch: { $regex: "India", $options: 'i' } }
            });
            if (movies.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "No Bollywood Movies Found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All Bollywood movies",
                    data: movies
                });
            }
        } catch (error) {
            console.error("Error fetching movies by genre:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static getAllMoviesByMovieTitle = async (req, res) => {
        try {
            const { title } = req.query;
            const movies = await moviesModel.find({
                movieTitle: { $regex: title, $options: 'i' }
            });
            if (movies.length === 0) {
                const serires = await seriesModel.find({
                    seriesTitle: { $regex: title, $options: 'i' }
                });
                if (serires.lenght === 0) {
                    return res.status(403).json({
                        success: false,
                        message: "NO Movie Or Series Found!",
                    })
                } else {
                    return res.status(200).json({
                        success: true,
                        message: "Searched Data!",
                        data: serires,
                    })
                }

            } else {
                return res.status(200).json({
                    success: true,
                    message: "Searched Data!",
                    data: movies,
                })
            }

        } catch (error) {
            console.log("HAving Errors: ", error);
            return req.status(500).json({
                success: false,
                message: "Having Errors"
            });
        }
    };

    static addtoWatchNow = async (req, res) => {
        try {
            let { type } = req.body;
            if (type === "Movie") {
                let { userId, id } = req.body;
                const watched = await watchNowMovie.find({ userId, movieId: id });
                if (watched.length === 0) {
                    const newMovie = new watchNowMovie({
                        userId,
                        movieId: id,
                    });
                    const movie = await newMovie.save();
                    return res.status(200).json({
                        success: true,
                        message: "Movie is Added to Watching Now!",
                        data: movie
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Movie is Already In Watch Now!"
                    })
                }
            } else {
                let { userId, id } = req.body;
                const watched = await watchNowSeries.find({ userId, seriesId: id });
                if (watched.length === 0) {
                    const newMovie = new watchNowSeries({
                        userId,
                        seriesId: id,
                    });
                    const movie = await newMovie.save();
                    return res.status(200).json({
                        success: true,
                        message: "Series is Added to Watching Now!",
                        data: movie
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Series is Already In Watch Now!"
                    })
                }
            }
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

    static getAllWatchNow = async (req, res) => {
        try {
            const userId = req.query;
            const movies = await watchNowMovie.find(userId);
            const series = await watchNowSeries.find(userId);
            if (movies.length === 0 && series.length === 0) {
                return res.status(200).json({
                    success: false,
                    message: "No Movie or Series Found in WatchNow!"
                })
            } else {
                const watchNowHistory = {
                    movies,
                    series
                }
                return res.status(200).json({
                    success: true,
                    msg: "Watch Now History!",
                    data: watchNowHistory
                })
            }
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

    static deleteWatchHistory = async (req, res) => {
        try {
            let { type } = req.body;
            if (type === "Movie") {
                let { userId, id } = req.body;
                const watched = await watchNowMovie.find({ userId, movieId: id });
                if (watched.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "No Movie Found!"
                    })
                } else {
                    const movie = await watchNowMovie.findByIdAndDelete({ movieId: id });
                    return res.status(200).json({
                        success: true,
                        message: "Movie Is Removed From Wathc Later!",
                    })
                }
            } else {
                let { userId, id } = req.body;
                const watched = await watchNowSeries.find({ userId, seriesId: id });
                if (watched.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "No Series Found!"
                    })
                } else {
                    const movie = await watchNowSeries.findByIdAndDelete({ seriesId: id });
                    return res.status(200).json({
                        success: true,
                        message: "Series Is Removed From Wathc Later!",
                    })
                }
            }
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

    static setTrending = async (req, res) => {
        try {
            const { id } = req.body;
            const movie = await moviesModel.findOne({ _id: id });
            if (!movie) {
                const { id } = req.body;
                const series = await seriesModel.findOne({ _id: id });
                if (!series) {
                    return res.status(200).json({
                        success: true,
                        message: "No Movie Or Series Found!"
                    })
                } else {
                    series.trending = !series.trending;
                    const result = await series.save();
                    return res.status(200).json({
                        success: true,
                        message: "Series Set to Trending!",
                        data: result
                    })
                };
            } else {
                movie.trending = !movie.trending;
                const result = await movie.save();
                return res.status(200).json({
                    success: true,
                    message: "Movie Set To Trending!",
                    data: movie
                });
            };
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

    static trendigMovies = async (req, res) => {
        try {
            const movies = await moviesModel.find({trending: true});
            return res.status(200).json({
                success: true,
                message: "All Trending Movies!",
                data: movies
            })
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

    static trendingSeries = async (req, res) => {
        try {
            const series = await seriesModel.find({trending: true});
            return res.status(200).json({
                success: true,
                message: "All Trending Series!",
                data: series
            })
        } catch (error) {
            console.log("Error", error);
            return res.status(503).json({
                success: false,
                message: "Having errors"
            })
        }
    };

};

module.exports = movieController;