import dotenv from 'dotenv';
import mongoose from "mongoose";
import { Admin } from "./models/admin.model.js";
import connectDB from '../../config/db.js';
import path from 'path';
import { envpath } from '../../envpath.js';

dotenv.config({ path: path.resolve(envpath+'.env') });

(async ()=>{
    await connectDB();
    await Admin.create({
        email:String(process.env.ADMIN_EMAIL),
        password:String(process.env.ADMIN_PASS)
    });

    console.log("Admin created");
    process.exit();
})();