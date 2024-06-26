import jwt from 'jsonwebtoken';
import Movies from '../models/Movies.js';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

export const addMovie = async(req, res, next)=>{
    const extractedToken = req.headers.authorization.split(" ")[1];
    if(!extractedToken && extractedToken.trim() === ""){
        return res.status(404).json({message: "Token Not Found"});
    }
    
    let adminId;

    //verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted)=>{
        if(err){
            return res.status(400).json({message: `${err.message}`});
        }else{
            adminId = decrypted.id;
            return;
        }
    });

    //create new movie
    const {title, description,actors, releaseDate, posterUrl, featured} = req.body;
    if(!title  && title.trim()==="" && !description && description.trim()==="", !posterUrl && posterUrl.trim()===""){
        res.status(422).json({message : "Invalid Inputs"});
    }

    let movie;
    try{
        movie = new Movies({title, description,actors, releaseDate : new Date(`${releaseDate}`),posterUrl, featured, admin: adminId});
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});
        await session.commitTransaction();
    }catch(e){
        return console.log(e);
    }

    if(!movie){
        return res.status(500).json({message: "Request Failed"}
        )
    }
    return  res.status(201).json({message: movie});
    
}

export const getAllMovies = async(req, res, next)=>{
    let movies;

    try {
        movies = await Movies.find();
    } catch(e){
        console.log(e);
    }

    if(!movies){
        return res.status(500).json({message: "Request Failed"});
    }
    return res.status(200).json(movies);
}

export const getMovieById = async (req, res, next) => {
    const id = req.params.id;
    let movie;
    try{
        movie = await Movies.findById(id);
    }catch(e){
        console.log(e);
    }
    if(!movie){
        return res.status(404).json({message: "Invalid Movie Id"})
    }
    return res.status(200).json(movie);
}

