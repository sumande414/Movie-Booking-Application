import React, { useEffect, useState } from 'react'
import {AppBar, Autocomplete, Tab, Tabs, TextField, Toolbar} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie';
import {Box} from '@mui/system'
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link } from 'react-router-dom';

const Header = () => {
    const [value, setValue] = useState(0);
    const [movies, setMovies] = useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data)).catch((err)=>{console.log(err)});
    },[]);
  return <AppBar sx={{bgcolor: "#2b2d42"}} position="sticky">
    <Toolbar>
        <Box width={'20%'}>
            <MovieIcon></MovieIcon>

        </Box>
        <Box width={"30%"} margin={"auto"}>
            <Autocomplete
            id="free-solo-demo"
            freeSolo
            options = {movies && movies.map((option)=>option.title)}
            renderInput={(params) => <TextField 
                variant='standard'
                sx={{input: {color: "white"}}}
                {...params} placeholder="Search" />}
        />
        </Box>
        <Box>
            <Box display = {'flex'}>
                <Tabs textColor="inherit" indicatecolor="secondary" value = {value} onChange={(e,val)=>setValue(val)} >
                <Tab LinkComponent={Link} to="/movies" label="Movies"/>
                <Tab LinkComponent={Link} to="/auth" label="Auth"/>
                <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                </Tabs>
            </Box>
        </Box>
    </Toolbar>
  </AppBar>
}

export default Header;
