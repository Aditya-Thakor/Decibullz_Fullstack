import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String,
        required:true
    },
    coupon:{
        type:String
    },
});

export const Products = mongoose.model("Products", productSchema);