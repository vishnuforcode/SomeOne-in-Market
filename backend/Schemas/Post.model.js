import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type: String ,
        required : true
    },
    tillTime : {
        type : Date ,
        required : true
    },
    conditions : {
        type : String
    }

    
})

export const Post = mongoose.model ("Post" , PostSchema)