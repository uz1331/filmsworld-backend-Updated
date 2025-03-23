const seriesModel = require("../Models/seriesModel");
const seasonModel = require("../Models/seasonModel");
const episodeModel = require("../Models/episodeModel");
const movieWatchLater = require("../Models/watchLater");
const seriresWatchLater = require("../Models/seriesWatchLater");
const seriesWatchLaterModel = require("../Models/seriesWatchLater");

class SeriesController{
    
    static addTestSeries = async (req, res) => {
        try{
            const {imdbId} = req.body;
            console.log("ImdbId: ", imdbId);
            const exist = await seriesModel.findOne({imdbId: imdbId});
            if(exist){
                return res.status(403).json({
                    success: false,
                    message: "Series Already exist"
                })
            } else {
                const newSeries = new seriesModel(req.body);  
                const series = await newSeries.save();
                // console.log("Series Saved: ", series);
                return res.status(200).json({
                    success: true,
                    message: "Series Successfully Saved!",
                    data: series
                })
            }             
        } 
        catch(error){
            console.log("having Error: ", error);
            return res.status(403).json({
                success: false,
                message: "Error Saving Series,"
            });
        } 
    };

    static addTestSeason = async (req, res) => {
        try {
            const { seasonNumber } = req.body;
            const exist = await seasonModel.findOne({seasonNumber: seasonNumber});
            if(exist){
                return res.status(403).json({
                    sucess: false,
                    message: "Season Already Exist",
                })
            } else {
                const newSeason = new seasonModel(req.body);
                const result = await newSeason.save();
                console.log("Season Added :", result);
                return res.status(200).json({
                    success: true,
                    message: "Season Added Successfully",
                    data: result,
                })
            }
        } catch (error) {
            console.log("Having Error :", error);
            return res.status(403).json({
                sucess: false,
                message: "Having Error",
            })
        }
    };
    
    static addTestEpisode = async (req, res) => {
        try {
            const { episodeNumber } = req.body;
            const exist = await episodeModel.findOne({episodeNumber: episodeNumber});
            if(exist) {
                return res.status(403).json({
                    success: false,
                    message: "Episode Already Exist",
                })
            } else {
                const newEpisode = new episodeModel(req.body);
                const result = await newEpisode.save();
                console.log("Episode Added :", result);
                return res.status(200).json({
                    success: true,
                    message: "Episode Added Successfully!",
                    data: result,
                })
            }
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getAllSeries = async (req, res) => {
        try {
            const series = await seriesModel.find();
            if( series.length === 0){
                return res.status(403).json({
                    sucess: false,
                    message: "No Series Found!",
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "All Series",
                    data: series,
                })
            };
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getSeriesByID = async (req, res) => {
        try {
            const { seriesId } = req.query;
            const series = await seriesModel.findById({_id: seriesId});
            if(series){
                return res.status(200).json({
                    success: true,
                    message: "Series Details!",
                    data: series,
                })
            } else {
                return res.status(403).json({
                    success: false,
                    message: "No Series Details Found!"
                })
            };
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static deleteSeriesById = async (req, res) => {
        try {
            const { SeriesId } = req.query;
            const season = await seriesModel.findByIdAndDelete({_id: seasonId});
                return res.status(200).json({
                    success: true,
                    message: "Series Deleted!",
                })
            
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getAllSeasonBySeriesId = async (req, res) => {
        try {
            const { seriesId } = req.query;
            const seasons = await seasonModel.find({seriesId: seriesId});
            if(seasons.length === 0){
                return res.status(403).json({
                    success: false,
                    message: "No Season Found For This Series!",
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message: "All Seasons!",
                    data: seasons,
                })
            };
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getSeasonById = async (req, res) => {
        try {
            const { seasonId } = req.query;
            const season = await seasonModel.findById({_id: seasonId});
            if(season){
                return res.status(200).json({
                    success: true,
                    message: "Season Details!",
                    data: season
                })
            } else {
                return res.status(403).json({
                    success: false,
                    message: "No Season Details Found!"
                })
            };
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static deleteSeasonById = async (req, res) => {
        try {
            const { seasonId } = req.query;
            const season = await seasonModel.findByIdAndDelete({_id: seasonId});
                return res.status(200).json({
                    success: true,
                    message: "Season Deleted!",
                })
            
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getAllEpisodesBySeasonId = async (req, res) => {
        try {
            const { SeasonId } = req.query;
            const episodes = await episodeModel.find({SeasonId: SeasonId});
            if( episodes.length === 0 ){
                return res.status(403).json({
                    success: false,
                    message: "No Episode Found!",
                })
            } else {
                return res.status(200).json({
                    success: true,
                    message:"All Episodes in this Season!",
                    data: episodes
                })
            };
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static getEpisodeByID = async (req, res) => {
        try {
            const { episodeId } = req.query;
            const episode = await episodeModel.findById({_id: episodeId});
            if(episode){
                return res.status(200).json({
                    success: true,
                    message: "Episode Details!",
                    data: episode
                });
            } else {
                return res.status(403).json({
                    success: false,
                    message: "No Episode Found!"
                })
            }
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static deleteEpisodeById = async (req, res) => {
        try {
            const { episodeId } = req.query;
            const season = await episodeModel.findByIdAndDelete({_id: seasonId});
                return res.status(200).json({
                    success: true,
                    message: "Season Deleted!",
                })
            
        } catch (error) {
            console.log("Having Errors : ", error);
            return res.status(403).json({
                success: false,
                message: "having Errors",
            })
        }
    };

    static addtoWatchLater = async (req, res) => {
        try {
            let { type } = req.body;
            if (type === "Movie") {
                let { userId, id } = req.body;
                const watched = await movieWatchLater.find({ userId, movieId: id });
                if (watched.length === 0) {
                    const newMovie = new movieWatchLater({
                        userId,
                        movieId: id,
                    });
                    const movie = await newMovie.save();
                    return res.status(200).json({
                        success: true,
                        message: "Movie is Added to Watching LAter!",
                        data: movie
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Movie is Already In Watch Later!"
                    })
                }
            } else {
                let { userId, id } = req.body;
                const watched = await seriresWatchLater.find({ userId, seriesId: id });
                if (watched.length === 0) {
                    const newMovie = new seriresWatchLater({
                        userId,
                        seriesId: id,
                    });
                    const movie = await newMovie.save();
                    return res.status(200).json({
                        success: true,
                        message: "Series is Added to Watching Later!",
                        data: movie
                    })
                } else {
                    return res.status(200).json({
                        success: false,
                        message: "Series is Already In Watch Later!"
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

    static getAllWatchLater = async (req, res) => {
        try {
            const userId = req.query;
            const movies = await movieWatchLater.find(userId);
            console.log(" Movie",movies)
            const series = await seriresWatchLater.find(userId);
            console.log("first :", series)
            if(movies.length === 0 && series.length === 0){
                return res.status(200).json({
                    success: false,
                    message: "No Movie or Series Found in WatchNow!"
                })
            } else {
                const watchLater = {
                    movies,
                    series
                }
                return res.status(200).json({
                    success: true,
                    msg: "Watch Later History!",
                    data: watchLater
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

    static deleteWatchLaterHistory = async (req, res) => {
        try {
            let { type } = req.body;
            if (type === "Movie") {
                let { userId, id } = req.body;
                const watched = await movieWatchLater.find({ userId, movieId: id });
                if (watched.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "No Movie Found!"
                    })
                } else {
                    const movie = await movieWatchLater.findByIdAndDelete({ movieId: id });
                    return res.status(200).json({
                        success: true,
                        message: "Movie Is Removed From Wathc Later!",
                    })
                }
            } else {
                let { userId, id } = req.body;
                const watched = await seriresWatchLater.find({ userId, seriesId: id });
                if (watched.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: "No Series Found!"
                    })
                } else {
                    const movie = await seriresWatchLater.findByIdAndDelete({ seriesId: id });
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

    static GetAllAnimeTest = async (req, res) => {
        try {
            const movies = await seriesModel.find({
                genre: { $elemMatch: { $regex: "Animation", $options: '' } }
            });
            if (movies.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "No Anime Series Found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All Anime Series",
                    data: movies
                });
            }
        } catch (error) {
            console.error("Error fetching Anime Series by genre:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static GetAllCartoonTest = async (req, res) => {
        try {
            const movies = await seriesModel.find({
                genre: { $elemMatch: { $regex: "Cartoon", $options: '' } }
            });
            if (movies.length === 0) {
                res.status(403).json({
                    success: false,
                    message: "No Cartoon Series Found!"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "All Cartoon Series",
                    data: movies
                });
            }
        } catch (error) {
            console.error("Error fetching Cartoon Series by genre:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    };
};

module.exports = SeriesController