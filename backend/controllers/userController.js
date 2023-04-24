import userModel from '../models/userModel.js';
import mongoose from 'mongoose';

// get all posts
// const getAllPosts = async (req, res) => {
//     const posts = await postModel.find({}).sort({createdAt: -1});

//     // send posts to client
//     res.status(200).json(posts);
// }

// // get a single post
// const getSinglePost = async(req, res) => {
//     const { id } = req.params;

//     if(!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: 'No Post Found'});
//     }

//     const singlePost = await postModel.findById(id);

//     if(!singlePost) {
//         return res.status(404).json({error: 'No Post Found'});
//     }

//     res.status(200).json(singlePost);
// }

// create a new user
const createUser = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        const newUser = await userModel.create({ email, username, password });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            throw new Error("Wrong Username");
        }

        const checkUserAuth = await user.comparePassword(password, user.password);

        if (!checkUserAuth) {
            throw new Error("Wrong Password");
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

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

export default { createUser, login }