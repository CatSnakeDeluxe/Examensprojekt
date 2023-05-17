import postModel from '../models/postModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// get all posts
const getAllPosts = async (req, res) => {
    const posts = await postModel.find({}).sort({createdAt: -1});

    // send posts to client
    res.status(200).json(posts);
}

// get all posts for one user
const getAllUserPosts = async (req, res) => {
    // console.log("USERID", req.user._id);
    const posts = await postModel.find({ postedBy: req.user._id }).sort({createdAt: -1});

    // send posts to client
    res.status(200).json(posts);
}

// get a single post
const getSinglePost = async(req, res) => {
    const { id } = req.params;
    console.log("POST ID:", id);
    // console.log("REQ:", req);

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
    console.log('INSIDE UPDATE');
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Post Found'});
    }

    const postToUpdate = await postModel.findById(id);

    // console.log('REQ', req);

    // const postToUpdate = await postModel.findOneAndUpdate({_id: id}, {
    //     ...req.body,
    //     ...req.file
    // });
    console.log('REQ', req);
    // update description and hashtags from req.body
    postToUpdate.description = req.body.description;
    
    postToUpdate.hashtags = req.body.hashtags;

    // update file if it exists in req.file
    if (req.file) {
    postToUpdate.file = req.file.filename;
    }

    if(!postToUpdate) {
        return res.status(400).json({error: 'No Post Found'});
    }

    // save the updated post
    await postToUpdate.save();
    console.log('postToUpdate', postToUpdate);
    res.status(200).json(postToUpdate);
}

// delete a post
const likePost =  async (req, res) => {
    // const id = '64636002d5ce1124e161a7e0';
    // const userId = '645224d67a83027d838356c9';

    const { id } = req.params;
    const { user_id } = req.body;

    // const post = await postModel.findById(id);
    // const isLiked = post.likes.get(user_id);
    // console.log(post.likes)

    // if (isLiked) {
    //     post.likes.delete(user_id);
    // } else {
    //     post.likes.set(user_id, true);
    // }

    const updatedPost = await postModel.findByIdAndUpdate(
        id,
        { likes: user_id },
        // { new: true }
    );

    res.status(200).json(updatedPost);
}

export default { getAllPosts, getAllUserPosts, getSinglePost, createPost, deletePost, updatePost, likePost }