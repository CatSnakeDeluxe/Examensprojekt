import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all Users'});
// });

// router.get('/:id', (req, res) => {
//     res.json({mssg: 'GET a single User'});
// });

router.post('/', userController.createUser);

router.post('/login', userController.login);

// router.delete('/:id', (req, res) => {
//     res.json({mssg: 'DELETE a user'});
// });

// router.patch('/:id', (req, res) => {
//     res.json({mssg: 'UPDATE a user'});
// });

export default router;