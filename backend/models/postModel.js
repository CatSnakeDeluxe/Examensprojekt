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
    commentsCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "like"
    }],
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);

export default postModel;