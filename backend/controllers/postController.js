import postModel from '../models/postModel.js';
import notificationModel from '../models/notificationModel.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// get all posts
const getAllPosts = async (req, res) => {
    const posts = await postModel.find({}).sort({createdAt: -1});

    // send posts to client
    res.status(200).json(posts);
}

// get all posts for logged in user
const getAllUserPosts = async (req, res) => {
    console.log('USER', req.user._id);
    const posts = await postModel.find({ postedBy: req.user._id }).sort({createdAt: -1});

    // send posts to client
    res.status(200).json(posts);
}

// get all posts for one clicked user
const getAllUserPostsSelectedUser = async (req, res) => {
    const userId = req.params.id.toString();
    const posts = await postModel.find({ postedBy: userId }).sort({ createdAt: -1 });

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
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No Post Found'});
    }

    const postToUpdate = await postModel.findById(id);

    postToUpdate.description = req.body.description;
    postToUpdate.hashtags = req.body.hashtags;
    postToUpdate.filename = req.file.filename;

    if(!postToUpdate) {
        return res.status(400).json({error: 'No Post Found'});
    }

    await postToUpdate.save();

    res.status(200).json(postToUpdate);
}

// const respond = (socket) => {
//     return (data) => {
//       socket.emit('notification', data);
//     };
// };

const likePost = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req.body;
  
    try {
        // Check if the post exists
        const post = await postModel.findById(id);
        if (!post) {
          return res.status(404).json({ error: 'Post not found' });
        }
    
        // Check if the user has already liked the post
        const existingLikeIndex = post.like.findIndex((like) => like === user_id);
    
        if (existingLikeIndex !== -1) {
          // User has already liked the post, so unlike it
          post.like.splice(existingLikeIndex, 1);
          await post.save();
          return res.status(200).json({ message: 'Post unliked successfully' });
        }

        if (existingLikeIndex < 1) {
        // User has not liked the post, so like it
        post.like.push(user_id);
        await post.save();
    
        const notification = new notificationModel({
          postId: id, // ID of the post
          likedBy: user_id, // ID or name of the user who liked the post
        });
    
        await notification.save();

        // req.app.get('io').emit('notification', { message: 'A new response from the controller' });

        res.status(200).json({ message: 'Post liked successfully' });
        }

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
};

const getNotifications = async (req, res) => {
    const { userId } = req.query;

    try {
        // Fetch notifications for the posts the logged-in user has posted
        const notifications = await notificationModel.find({ postedBy: userId }).sort({createdAt: -1});

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
  
const search = async (req, res) => {
    const { query } = req.body;

    try {
        // Use a regular expression to perform a case-insensitive search for posts with matching hashtags
        const posts = await postModel.find({ hashtags: { $regex: query, $options: 'i' } });

        res.json(posts);
    } catch (error) {
        console.error('Error searching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default { getAllPosts, getAllUserPosts, getAllUserPostsSelectedUser, getSinglePost, createPost, deletePost, updatePost, likePost, getNotifications, search }