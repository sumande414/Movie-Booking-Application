import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
import Movieitem from './Movieitem';

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data)).catch(err=>console.log(err));
  },[]);
  
  return <Box margin={'auto'} marginTop={4}>
    <Typography variant = "h4"
    margin={"auto"}
    padding={2} 
    textAlign="center"
    width={"40%"}
    bgcolor={"#900C3F"}
    color="white"
    >
      All Movies
    </Typography>
    <Box width={'100%'} margin="auto" display={"flex"} justifyContent = {"flex-start"} flexWrap={"wrap"}>
      
      {movies && movies.map((movie,index)=><Movieitem id={movie._id} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate}></Movieitem>
        )}
    </Box>
  </Box>
}

export default Movies
