import express from 'express';
import cors from 'cors';
import { addMovie, getAllMovies, getMovieById } from '../controllers/movie-controller.js';
const movieRouter = express.Router();
const app = express();

movieRouter.get("/", cors(), getAllMovies);
movieRouter.get("/:id",getMovieById);
movieRouter.post("/", addMovie);


export default movieRouter;