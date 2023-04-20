import express from 'express';
import userModel from '../models/userModel.js';

const router = express.Router();

// get all posts
router.get('/', (req, res) => {
    res.json({mssg: 'GET all Users'});
});

// get a single post
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single User'});
});

// post a post
router.post('/', async(req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await userModel.create({ username, password });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

// delete a post
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a user'});
});

// update a post
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a user'});
});

export default router;