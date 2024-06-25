import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getAllUsers = async(req,res, next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        return console.log(err);
    }

    if(!users) {
        return res.status(500).json({message: "Unexpected Error occured"});
    }

    return res.status(200).json({users});
}

export const addUser = async(req,res,next)=>{
    const {name, email, password} = req.body;
    if(!name && name.trim() == "" && !email && email.trim()=="" && !password && password.trim() == ""){
        return res.status(422).json({message : "Invalid Inputs"});
    };

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    let user;
    try{
        user = new User({name, email, password: hashedPassword});
        user = await user.save();
    } catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message : "Unexpected error Occurred"});
    }
    return res.status(201).json({user});
}

export const updateUser = async(req,res,next) => {
    const id = req.params.id;
    const {name, email, password} = req.body;
    if(!name && name.trim() == "" && !email && email.trim()=="" && !password && password.trim() == ""){
        return res.status(422).json({message : "Invalid Inputs"});
    };

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    let user;
    try{
        user = await User.findByIdAndUpdate(id, {
            name,
            email,
            password: hashedPassword
        })
    } catch(e){
        return console.log(e);
    }
    if(!user){
        return res.status(500).json({message: "Something went wrong"});
    }
    res.status(200).json({message  : "updated successfully"});
}

export const deleteUser = async(req,res,next)=>{
    const id = req.params.id;

    let user;
    try{
        user = await User.findByIdAndDelete(id);
    }catch(e){
        return console.log(e);
    }
    if(!user){
        return res.status(500).json({message: "Something went wrong"});
    }
    res.status(200).json({message  : "deleted successfully"});
}