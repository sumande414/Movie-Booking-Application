import React, { Fragment, useEffect, useState } from 'react'
import { getUserBooking } from '../api-helpers/api-helpers'
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const UserProfile = () => {
    const [bookings, setBookings] = useState();
    useEffect(()=>{
        getUserBooking().then(res=> setBookings(res)).catch((err)=>console.log(err));
    },[]);
    console.log(bookings);
  return <Box width={"100%"} display="flex">
    {bookings && bookings.length>0 &&(
        <Fragment><Box flexDirection={"column"} justifyContent="center" alignItems={"center"} width={"30%"} >
        <AccountCircleIcon sx = {{fontSize:"10rem"}}/>
        <Typography padding={1} width={"auto"} textAlign={'center'} border={'1px solid #ccc'} borderRadius={6}>

        </Typography>
    </Box>

    <Box width={"70%"}></Box>
    </Fragment>)}
  </Box>
}

export default UserProfile
