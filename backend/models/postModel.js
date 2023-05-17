import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    hashtags: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId, 
        ref: "user"
    },
    comments: [{
        types: Array, 
        default: []
    }],
    likes: [{
        types: Array, 
        default: []
    }],
    // likes: [{
    //     type: Map, 
    //     of: Boolean
    // }],
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);

export default postModel;