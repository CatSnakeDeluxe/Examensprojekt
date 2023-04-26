import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

dotenv.config();

// get all posts
// const getAllPosts = async (req, res) => {
//     const posts = await postModel.find({}).sort({createdAt: -1});

//     // send posts to client
//     res.status(200).json(posts);
// }

// get a single post
const getSingleuser = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No User Found'});
    }

    const singleUser = await userModel.findById(id);

    if(!singleUser) {
        return res.status(404).json({error: 'No User Found'});
    }

    res.status(200).json(singleUser);
}
// const createUser = async (req, res) => {
//     const { email, username, password } = req.body;

//     try {
//         const newUser = await userModel.create({ email, username, password });

//         res.status(200).json(newUser);
//     } catch (err) {
//         res.status(400).json({error: err.message});
//     }
// }



// delete a post
// const deletePost =  async (req, res) => {
//     const { id } = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No Post Found'});
//     }

//     const postToDelete = await postModel.findOneAndDelete({_id: id});

//     if(!postToDelete) {
//         return res.status(400).json({error: 'No Post Found'});
//     }

//     res.status(200).json(postToDelete);
// }

// // update a post
// const updatePost =  async (req, res) => {
//     const { id } = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No Post Found'});
//     }

//     const postToUpdate = await postModel.findOneAndUpdate({_id: id}, {
//         ...req.body
//     });

//     if(!postToUpdate) {
//         return res.status(400).json({error: 'No Post Found'});
//     }

//     res.status(200).json(postToUpdate);
// }

export default { getSingleuser }