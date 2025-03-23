const express = require('express')
const Route = express.Router();
const AuthMiddleware = require("./Middleware/Auth");
const AuthController = require("./Controller/Auth");
const MovieController = require("./Controller/MovieController");
const SeriesController = require("./Controller/SeriesController");

//Auth
Route.post('/user/register', AuthController.Register)
Route.post('/user/social-auth-register', AuthController.SocialAuthRegister)
Route.post('/user/login', AuthController.Login)
Route.get('/user/get-all-user', AuthMiddleware.CheckUserAuth, AuthController.GetAllUser)
Route.post('/user/suggestion', AuthMiddleware.CheckUserAuth, AuthController.Suggestion);
Route.post('/admin/events', AuthController.Events);
Route.get('/admin/get-suggestion', AuthMiddleware.CheckUserAuth, AuthController.GetAllSuggestion);
Route.post("/user/addBannerImage", AuthMiddleware.uploadBanner.single("Banner"), AuthController.AddBanner);
Route.get("/user/getBanner", AuthController.GetBanner);
Route.post("/user/setTrending", MovieController.setTrending);
Route.get("/user/allTrendingMovies", MovieController.trendigMovies);
Route.get("/user/allTreningSeries", MovieController.trendingSeries);

//Movies
Route.post("/user/addMovie", MovieController.AddMovieTesting);
Route.get("/user/getMovieById", MovieController.getMovieById);
Route.get("/user/getAllMovies", MovieController.getAllMovies);
Route.get("/user/getHollywoodMovies", MovieController.GetAllHollywoodMovies);
Route.get("/user/getBollywoodMovies", MovieController.GetAllBollywoodMovies);
Route.get("/user/searchMoviesSeries", MovieController.getAllMoviesByMovieTitle);
Route.get("/user/moviesByCategory", MovieController.GetAllMoviesByGenre);
Route.post("/user/DeleteMovie", MovieController.deleteMovie);

//Series
Route.post("/user/addSeries", SeriesController.addTestSeries);
Route.get("/user/getAllSeries", SeriesController.getAllSeries);
Route.get("/user/getSeriesById", SeriesController.getSeriesByID);
Route.post("/user/deletSeries", SeriesController.deleteSeriesById);
Route.get("/user/AnimeSeries", SeriesController.GetAllAnimeTest)
Route.get("/user/CartoonSeries", SeriesController.GetAllCartoonTest);

//Season
Route.post("/User/addSeason", SeriesController.addTestSeason);
Route.get("/user/getSeasonById", SeriesController.getSeasonById);
Route.get("/user/getAllSeasons", SeriesController.getAllSeasonBySeriesId);
Route.post("/user/deleteSeason", SeriesController.deleteSeasonById);

//Epsisodes
Route.post("/user/addEpisode", SeriesController.addTestEpisode);
Route.get("/user/getEpisode", SeriesController.getEpisodeByID);
Route.get("/user/allEpisodes", SeriesController.getAllEpisodesBySeasonId);
Route.post("/user/deleteEpisode", SeriesController.deleteEpisodeById);

//WatchNow 
Route.post("/user/addWatchNow", MovieController.addtoWatchNow);
Route.get("/user/getWatchNow", MovieController.getAllWatchNow);
Route.post("/user/deleteWatchNow", MovieController.deleteWatchHistory);

//Watch Later
Route.post("/user/addWatchLater", SeriesController.addtoWatchLater);
Route.get("/user/getAllWatchLater", SeriesController.getAllWatchLater);
Route.get("/user/deleteWatchlater", SeriesController.deleteWatchLaterHistory);

module.exports = Route;
