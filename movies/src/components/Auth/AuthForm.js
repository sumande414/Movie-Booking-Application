import { Box, Button, Dialog, FormLabel, TextField, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React, { useState } from 'react'

const AuthForm = ({onSubmit, isAdmin}) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""

    });
    const [isSignup, setSignup] = useState(false);
    const handleChange = (e)=> {
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        onSubmit({inputs, signup:isAdmin ? false:isSignup});
    }
  return (
    <Dialog PaperProps={{style: {borderRadius: 20}}} open={true}>
        <Box sx={{ml: "auto", padding: 1}}>
            <CloseRoundedIcon/>
        </Box>
        <Typography variant="h4" textAlign={'center'}>
        {!isSignup?"LOGIN":"SIGNUP"}
        </Typography>
        <form onSubmit={handleSubmit}>
            <Box padding={4} display={'flex'} justifyContent={'center'} flexDirection = "column" width = {400} margin={'auto'} alignContent = {"center"}>
                {!isAdmin && isSignup && (
                <>
                    {" "}
                    <FormLabel>Name</FormLabel>
                    <TextField value={inputs.name} onChange={handleChange} margin="normal" variant="standard" type = {'name'} name='name'></TextField>

                </>
                    
                )}
                <FormLabel>Email</FormLabel>
                <TextField value={inputs.email} onChange={handleChange} margin="normal" variant="standard" type = {'email'} name='email'></TextField>
                <FormLabel>Password</FormLabel>
                <TextField value={inputs.password} onChange={handleChange} margin="normal" variant="standard" type = {'password'} name='password'></TextField>
                <Button sx={{mt:2, borderRadius:10, bgcolor:"#2b2d42"}} variant='contained' type="submit" fullwidth="true">{!isSignup?"Login":"Signup"}</Button>
                {!isAdmin &&(
                    <Button onClick={()=>setSignup(!isSignup)} sx={{mt:2, borderRadius:10}} fullwidth="true">SWITCH TO {isSignup?"Login":"Signup"}</Button>
                )
                }

            </Box>
        </form>
    </Dialog>
  )
}

export default AuthForm
