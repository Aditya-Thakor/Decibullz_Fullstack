import {log} from 'console';
import { Products } from '../models/product.model.js';

const addProduct = async(req,res)=>{
    console.log(req.body);

    try {
        const product = await Products(req.body)
         product.save();
        
        res.status(200).json({message:"product added successfully..", product})

    } catch (error) {
        log("Error at adding product..")
        res.status(401)
        log(error);
    }
    
};

const getProducts = async(req,res)=>{
    try {
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        console.log("error at getting products data");
           throw(error)
    }
};

const updateProduct = async(req,res)=>{
    const {_id}= req.body;
    const {productName,description,price,coupon, pImg} = req.body;

    try {
         const productImage= req.file? req.file.filename:pImg;

        const updatedData= {
            productName,description,price,coupon,productImage
        }

        const update = await Products.findByIdAndUpdate(_id,updatedData);
        res.status(200).json({message:"product's data updated successfully", update});
    } catch (error) {
        log("error at updating product data")
        throw(error);
    }
};

const deleteProduct = async(req,res)=>{
    const {_id}= req.body;
    try {
        const deletePd = await Products.findByIdAndDelete(_id);
        if(!deletePd){
            res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"product deleted successfully", deletePd})
    } catch (error) {
        log("Error at deleting product")
        throw(error)
    }
};

export  {addProduct, getProducts, deleteProduct, updateProduct}