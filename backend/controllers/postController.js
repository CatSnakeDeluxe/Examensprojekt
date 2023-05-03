import postModel from '../models/postModel.js';
// import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// get all posts
const getAllPosts = async (req, res) => {
    const posts = await postModel.find({}).sort({createdAt: -1});

    // send posts to client
    res.status(200).json(posts);
}

// get all posts for single user
// const getAllPostsByOneUser = async (req, res) => {
//     const { id } = req.params;

//     const posts = await postModel.find({ postedBy: id }).sort({createdAt: -1});

//     // send posts to client
//     res.status(200).json(posts);
// }

// get a single post
const getSinglePost = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Post Found'});
    }

    const singlePost = await postModel.findById(id);

    if(!singlePost) {
        return res.status(404).json({error: 'No Post Found'});
    }

    res.status(200).json(singlePost);
}

// create a new post
const createPost = async (req, res) => {
    const { description, hashtags } = req.body;
    const { filename } = req.file;

    try {
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // const userId = decodedToken.userId;
        const user_id = req.user._id;
        const newPost = await postModel.create({ description, hashtags, filename, postedBy: user_id });
        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// delete a post
const deletePost =  async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Post Found'});
    }

    const postToDelete = await postModel.findOneAndDelete({_id: id});

    if(!postToDelete) {
        return res.status(400).json({error: 'No Post Found'});
    }

    res.status(200).json(postToDelete);
}

// update a post
const updatePost =  async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Post Found'});
    }

    const postToUpdate = await postModel.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if(!postToUpdate) {
        return res.status(400).json({error: 'No Post Found'});
    }

    res.status(200).json(postToUpdate);
}

export default { getAllPosts, getSinglePost, createPost, deletePost, updatePost }