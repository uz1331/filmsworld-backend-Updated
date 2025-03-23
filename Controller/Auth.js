const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../Models/userModel');
const Suggestion = require('../Models/Suggestion')
const movieModel = require("../Models/movieModel");
const bannerModel = require('../Models/BannerModel')

let clients = [];

class AuthController {
    static Register = async (req, res) => {
        const { email, password, name } = req.body
        try {
            const existingUser = await userModel.findOne({ email: email });
            if (existingUser) {
                res.status(200).json({
                    success: "false",
                    message: "Email Already Exists."
                });
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(req.body.password, salt);

                const newUser = new userModel({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    password: hash,
                });
                await newUser.save();

                res.status(200).json({
                    success: "true",
                    message: "User Created"
                });
            }
        } catch (err) {
            console.error(err);
            res.status(200).json({
                success: false,
                message: err.message
            });
        }
    }

    static SocialAuthRegister = async (req, res) => {
        const { name, email } = req.body
        try {
            const UserExist = await userModel.findOne({ email, email })
            if (UserExist) {
                bcrypt.compare('123456789', UserExist.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            id: UserExist._id,
                            name: UserExist.name,
                            email: UserExist.email,
                        },
                            process.env.AppToken
                        )
                        res.status(200).json({
                            success: true,
                            data: {
                                id: UserExist._id,
                                name: UserExist.name,
                                email: UserExist.email,
                                token: token
                            }

                        });
                    }
                    else {
                        res.status(200).json({
                            success: false,
                            message: "Password doesn't match."
                        })
                    }
                })

            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash('123456789', salt);

                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    email: email,
                    password: hash,
                })
                await newUser.save()

                if (newUser) {

                    const token = jwt.sign({
                        id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    },
                        process.env.AppToken
                    )
                    res.status(200).json({
                        success: true,
                        data: {
                            id: newUser._id,
                            name: newUser.name,
                            email: newUser.email,
                            token: token
                        }
                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: "Something went wrong."
                    });
                }
            }
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            });
        }
    }

    static Login = async (req, res) => {
        const { email, password } = req.body
        const UserExist = await userModel.findOne({ email: email })
        if (UserExist) {
            bcrypt.compare(password, UserExist.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        id: UserExist._id,
                        name: UserExist.name,
                        email: UserExist.email,
                    },
                        process.env.AppToken
                    )
                    return res.status(200).json({
                        success: true,
                        data: {
                            id: UserExist.id,
                            name: UserExist.name,
                            email: UserExist.email,
                            token: token
                        }

                    });
                }
                else {
                    res.status(200).json({
                        success: false,
                        message: "Password Doesn't Match"
                    })
                }
            })
        }

        else {
            res.status(200).json({
                success: false,
                message: "Email doesn't exist."
            })
        }

    }

    static AddBanner = async (req, res) => {
        try {
            const BannerObj = req.file;
            console.log("first ", BannerObj.filename);
            const newBanner = new bannerModel({
               Banner: BannerObj.filename
            });
            const result = await newBanner.save()

            res.status(200).json({
                success: true,
                message: "Your Banner Has Been Uploaded.",
                data: result
            });

        } catch (error) {
            console.error('Error uploading:', error);
            res.status(200).json({
                success: false,
                message: error.message
            });
        }
    };

    static GetBanner = async (req, res) => {
        try {
            const GetBanner = await bannerModel.findOne()

            res.status(200).json({
                success: true,
                message: "Banner Image!",
                data: GetBanner
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    static Events = async (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        clients.push(res);

        req.on('close', () => {
            clients = clients.filter(client => client !== res);
        });
    };

    static Suggestion = async (req, res) => {
        const { AnySuggestion } = req.body
        try {
            const newSuggestion = new Suggestion({
                UserId: req.user._id,
                AnySuggestion: AnySuggestion
            })
            await newSuggestion.save()

            res.status(200).json({
                success: true,
                message: "Your suggestion has been sent."
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                message: error.message
            })
        }
    }

    static GetAllSuggestion = async (req, res) => {
        try {
            const GetAllSuggestion = await Suggestion.find()
            let AllDetail = []

            for (let i = 0; i < GetAllSuggestion.length; i++) {
                const UserDetail = await userModel.findById(GetAllSuggestion[i].UserId)

                AllDetail.push({
                    name: UserDetail.name,
                    email: UserDetail.email,
                    AnySuggestion: GetAllSuggestion[i].AnySuggestion,
                })
            }

            res.status(200).json({
                success: true,
                data: AllDetail
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                data: error.message
            })
        }
    }

    static GetAllUser = async (req, res) => {
        try {
            const AlUsers = await userModel.find({})

            res.status(200).json({
                success: true,
                data: AlUsers
            })
        } catch (error) {
            res.status(200).json({
                success: false,
                data: error.message
            })
        }
    }

    static addMoreMovieLanguages = async (req, res) => {

        
        const {movieId, movieLanguage, movieLink} = req.body

        if(movieId && movieLanguage && movieLink){

        
        const getMoviebyId = await movieModel.findOne({_id: movieId})

        if(getMoviebyId){
            const movieObj = {
                language:  movieLanguage,
                Link: movieLink
            }
            getMoviebyId.movies.push(movieObj)

            await getMoviebyId.save()

            res.send({
                success: true,
                getMoviebyId
            })

        }else{
            res.send({
                message:"Movie not found",
                success: false
            })
        }
    }else{
        res.send({
            message:"Please enter movie lanugage and movie link",
            success: false
        })
    }
    }
}



module.exports = AuthController