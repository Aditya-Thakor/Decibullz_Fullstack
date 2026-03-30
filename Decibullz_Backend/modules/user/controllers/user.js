import {log} from 'console';
import { Users } from '../models/user.model.js';

// create user;;;;
export const createUser = async(req,res)=>{
    
    //     console.log(req.body);
    const {username, email, password} = req.body;
    const profileImage = req.file? req.file.filename : ''
    const userData = {username, email,password, profileImage}

        try {
            const usr = await Users(userData);
            usr.save();
    
            res.status(200).json({
                message:"User created...",
                usr
            })
            
        } catch (error) {
            log("Error at creating new user..")
            res.status(401)
            log(error);
        }
}

// get user 
export const getUser = async(req,res) =>{
    try {
            const users = await Users.find();
            res.status(200).json(users);
    
        } catch (error) {
            log("Error at getting users")
            log(error)
        }
}


// update user

export const updateUser = async(req,res)=>{
    const data = req.body;
    const {_id}= data;
    const {username, displayName,email,password, pfp }=data;

    const profileImage= req.file? req.file.fieldname: pfp;

    const updatedData = {
        username,displayName,email,password,profileImage
    }
    
    try {
        
        const update = await Users.findByIdAndUpdate(_id,updatedData);
        res.status(200).json({
            message:"User update successfully",
            update
        })

    } catch (error) {
        log("Error at updating user");
        res.status(401).errored()
        log(error)
    }
}

// delete User 

export const deleteUser = async(req,res)=>{
     const {_id}= req.body;

    try {
        
        const deleted = await Users.findByIdAndDelete(_id);

        if(!deleted){
            res.status(404).json({
                message:"User not found"
            })
        }

        res.status(200).json({message:"User deleted!!"});

    } catch (error) {
        log("Error at deleting user");
        log(error);
    }
}