import express from 'express';
import postController from '../controllers/postController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();
router.use(requireAuth);

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