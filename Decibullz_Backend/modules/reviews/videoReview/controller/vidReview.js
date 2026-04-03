import {log} from 'console';
import { VideoReview } from '../models/videoReview.model';

const addVidReview = async(req,res)=>{
    log(req.body);
    try {
        const vidreview = await VideoReview(req.body)
        vidreview.save();
        res.status(200).json({message:"video review added successfully", vidreview});
    } catch (error) {
        log("error at adding product review video ");
        throw error
    }
}

const getVidReview = async(req,res)=>{
    try {
        const videoReviews = await VideoReview.find()

        res.status(200).json({message:"video reviews", videoReviews});
    } catch (error) {
        log("error at geting video reviews")
        throw error
    }
};


const deleteVidReview = async (req,res)=>{
    const {_id}= req.body;
    try {
        const deleteVidReview = await VideoReview.findByIdAndDelete(_id);

        if(!deleteVidReview){
            res.status(401).json({message:"cant find the review!!"})
        };

        res.status(200).json({message:"video review deleted successfully..", deleteVidReview});
        
    } catch (error) {
        log("error at deletting review video")
        throw error
    }
};