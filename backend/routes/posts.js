import express from 'express';
import postController from '../controllers/postController.js';
import requireAuth from '../middleware/requireAuth.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, uuidv4() + file.originalname);
  }
});

let upload = multer({ storage: storage, limits: { filesize: 300000 }});

const router = express.Router();
router.use(requireAuth);

// get all posts
router.get('/', postController.getAllPosts);

// post a post
router.post('/', upload.single('file'), postController.createPost);

// get all posts for one user
router.get('/userposts', postController.getAllUserPosts);

// get a single post
router.get('/userposts/:id', postController.getSinglePost);

// delete a post
router.delete('/userposts/:id', postController.deletePost);

// update a post
router.put('/userposts/:id', upload.single('file'), postController.updatePost);

// likes
router.patch('/:id/like', postController.likePost);

export default router;