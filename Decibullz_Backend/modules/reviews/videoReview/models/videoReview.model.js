import mongoose from "mongoose";

const vidReviewSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    }
},{timestamps:true})

export const VideoReview = mongoose.model("VideoReviews", vidReviewSchema);