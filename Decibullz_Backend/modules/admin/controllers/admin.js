import { Admin } from "../models/admin.model.js";

export const AdminLogin =async(req,res)=>{
    const {email, password}=req.body;

    const admin = await Admin.findOne({email,password});

    if(!admin){
        res.status(400).json({messsage:"Invelid credentials "})
    }

    res.json({msg:"Login successfull"})
}