import express from 'express';
import postController from '../controllers/postController.js';

const router = express.Router();

// get all posts
router.get('/', postController.getAllPosts);

// get a single post
router.get('/:id', postController.getSinglePost);

// post a post
router.post('/', postController.createPost);

// delete a post
router.delete('/:id', postController.deletePost);

// update a post
router.patch('/:id', postController.updatePost);

export default router;