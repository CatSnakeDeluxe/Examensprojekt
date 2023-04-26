import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.ObjectId, 
        ref: "user"
      }
}, { timestamps: true });

const postModel = mongoose.model("post", postSchema);

export default postModel;