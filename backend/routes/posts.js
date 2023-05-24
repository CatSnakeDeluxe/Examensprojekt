import express from 'express';
import postController from '../controllers/postController.js';
import requireAuth from '../middleware/requireAuth.js';
import multer from 'multer';
import sharp from 'sharp-multer';

const storage =
sharp ({
  destination:(req, file, callback) => {
    callback(null, "./public/uploads/");
  },
  imageOptions:{
  fileFormat: "jpg",
  quality: 80,
  resize: { width: 500, height: 500 },
  }
});

const upload  =  multer({ storage: storage , limits: { filesize: 300000 } });

const router = express.Router();
router.use(requireAuth);

// get all posts
router.get('/', postController.getAllPosts);

// post a post
router.post('/', upload.single('file'), postController.createPost);

// get all posts for one user
router.get('/userposts/selecteduser/:id', postController.getAllUserPostsSelectedUser);

// get all posts for one user
router.get('/userposts', postController.getAllUserPosts);

// get a single post
router.get('/userposts/:id', postController.getSinglePost);

// delete a post
router.delete('/userposts/:id', postController.deletePost);

// update a post
router.put('/userposts/:id', upload.single('file'), postController.updatePost);

// likes
router.put('/:id/like', postController.likePost);

// notifications
router.get('/notifications/:id', postController.getNotifications);

// search
router.post('/search', postController.search);

router.delete('/clearnotifications/:id', postController.clearNotifications);


export default router;