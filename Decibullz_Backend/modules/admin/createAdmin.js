import mongoose from "mongoose";
import { Admin } from "./models/admin.model";

mongoose.connect(process.env.MONGODB_URL);

(async ()=>{
    await Admin.create({
        email:process.env.ADMIN_EMAIL,
        password:process.env.ADMIN_PASS
    });

    console.log("Admin created");
    process.exit();
})();