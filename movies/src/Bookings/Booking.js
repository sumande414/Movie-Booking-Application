import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieDetails, newBooking } from '../api-helpers/api-helpers';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
    const[movie, setMovie] = useState();
    const [inputs, setInputs] = useState({seat : "", date: ""});
    const id = useParams().id;
    console.log(id);
    useEffect(()=> {
        getMovieDetails(id).then((res)=> setMovie(res)).catch((err)=>console.log(err));
    }, [id]);
    const handleChange = (e)=>{
        setInputs((prevState)=>({...prevState, [e.target.name]: e.target.value}))
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(movie)
        console.log(inputs.seat)
        newBooking({...inputs, movies: movie}).then((res)=>console.log(res)).catch((err)=>console.log(err));
    }
  return (
    <div>
        {movie && (
            <Fragment>
                <Typography
                    padding = {3}
                    fontFamily={"fantasy"}
                    variant='h4'
                    textAlign={"center"}
                    >
                        Book Tickets of Movie: {movie.title}

                </Typography>
                <Box display={"flex"} justifyContent={"center"}>
                    <Box display={'flex'} justifyContent={'column'}
                    flexDirection={'column'}
                    paddingTop={3}
                    width="50%">
                        <img width="80%" 
                        height = "300px"
                        src = {movie.posterUrl}
                        alt={movie.title}/>
                        <Box width={"80%"} marginTop={3} padding={2}></Box>
                        <Typography paddingTop={2}>{movie.description}</Typography>
                        <Typography fontWeight={"bold"} marginTop={1}>
                            Starrer:
                            {movie.actors.map((actor)=> " " + actor+" ")}
                        </Typography>
                        <Typography fontWeight={'bold'} marginTop={1}>
                            Release Date : {new Date(movie.releaseDate).toDateString()}
                        </Typography>

                    </Box>
                    <Box width = {"50%"} paddingTop={3}>
                        <form onSubmit={handleSubmit}>
                            <Box padding={5} margin='auto' display='flex' flexDirection={'column'}>
                                <FormLabel>Seat Number</FormLabel>
                                <TextField value={inputs.seat} onChange={handleChange} name="seat" type={"number"} margimn={"normal"} variant="standard" ></TextField>
                                <FormLabel>Booking Date</FormLabel>
                                <TextField value={inputs.date} onChange={handleChange} name="date" type={"date"} margimn={"normal"} variant="standard" ></TextField>
                                <Button type="submit" sx={{mt:3}}>Book Now</Button>
                            </Box>
                        </form>
                    </Box>

                </Box>
            </Fragment>
        )}
      
    </div>
  )
}

export default Booking
