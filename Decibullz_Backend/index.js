import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import cors from 'cors';
import connectDB from './config/db.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createUser, deleteUser, getUser, updateUser } from './modules/user/controllers/user.js';
import { addProduct, deleteProduct, getProducts, updateProduct } from './modules/product/controllers/product.js';
import { log } from 'console';
import { Users } from './modules/user/models/user.model.js';
import { AdminLogin } from './modules/admin/controllers/admin.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app= express();

//db connection::
connectDB();

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.redirect('http://localhost:5173/');
});

/* ::::: MULTER ::::: */ 

//folder check & create::

//image 
const imgStore = path.join(__dirname,'profiles');
if(!fs.existsSync(imgStore)){
    fs.mkdirSync(imgStore);
};

// product images
const pdImgs = path.join(__dirname,'productsImages');
if(!fs.existsSync(pdImgs)){
    fs.mkdirSync(pdImgs);
};

//video
const vidStore = path.join(__dirname,'reviewVideos');
if(!fs.existsSync(vidStore)){
    fs.mkdirSync(vidStore)
}


// Profile Storage ::
const PfpStorage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'profiles/');
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
});
const pfpUpload = multer({storage:PfpStorage});
app.use('/decibullz/user_profiles', express.static(path.join(__dirname,'profiles'))); /* <-- profile access api.. */

/* ----- profile storage end  */


// Product image storage ::
    const pdImgStorage = multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'productsImages/');
        },
        filename:function(req,file,cb){
            cb(null, file.originalname);
        }
    });
    const productUpload = multer({storage:pdImgStorage});
    app.use('/decibullz/products_images', express.static(path.join(__dirname,'productsImages')));

/*--------= product image storage end =-----=--=-===----=-=-=------=-----=----=----=---- */

// Video review Storage ::
const vidStorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'reviewVideos/');        
    },
    filename: function(req,file,cb){
        cb(null,file.originalname);
    }
});

const vidUpload = multer({storage:vidStorage});

app.use('/decibullz/products-review/videos', express.static(path.join(__dirname,'reviewVideos')));

/* ----- video reviews storage done!!! */
// admin login
app.post('/dz.admin/login', AdminLogin);
// admin login ended

// user login
app.post('/decibullz/user/login', pfpUpload.none(), async(req,res)=>{
 console.log(req.body);

 try {
    const validUser = await Users.findOne({email:req.body.email, password:req.body.password})
    log(validUser);
    if(!validUser){
        res.status(404).json({message:"User not found, please Signup first.."})
    }

        res.status(200).json({message:"User Logedin successfull..", validUser})
    // if(validUser && validUser?.password==res.body?.password ){
    //     res.status(200).json({message:"User Logedin successfull..", validUser})
    // }else{
    //     res.status(401).json({message:"Incorrect password"})
    // }
    

    
 } catch (error) {
    log('error at login user');
    throw (error)
 }

})

/*::: USER CRUD ::: */

    app.post('/decibullz/users/new-user', pfpUpload.single('pfp'), createUser); // create user;;
    app.get('/decibullz/users', getUser); // get user;;
    app.put('/decibullz/users/update-user',pfpUpload.single('pfp'), updateUser); //update usere;;
    app.delete('/decibullz/users/delete-user',pfpUpload.none(), deleteUser); //delete user;;

/* ------------------------------------------------------------------------------------------ */

/* ::: Product CRUD ::: */

    app.post('/decibullz/products/add-product', productUpload.single('pdImgs'), addProduct);
    app.get('/decibullz/products', getProducts);
    app.put('/decibullz/products/update-product', productUpload.single('pdImgs'), updateProduct);
    app.delete('/decibullz/products/delete-product', productUpload.none(), deleteProduct);

/********************************************************************************************/


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server started on port ${port}`);    
})