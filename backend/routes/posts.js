import express from 'express';
import postController from '../controllers/postController.js';

function ensureAuth(req,res,next) {
    const token = req.headers.authorization;
    if (!token) {
        // Token not found
        // return res.status(401).json({
        //     message: 'Unauthorized'
        // });
        return res.redirect('/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (decoded.exp < Date.now() / 1000) {
            return res.status(401).json({
                message: 'Token has expired'
            });
        }
        // console.log(decoded);
        // res.json({
        //     message: `User ${userId} is authorized`
        // });
        req.userId = userId;
        // Call the next middleware function
        next();
    } catch (error) {
        // Token is invalid
        // res.status(401).json({
        //     message: 'Unauthorized Token is invalid'
        // });
        res.redirect('/login');
    }
}

const router = express.Router();
router.use(ensureAuth);

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