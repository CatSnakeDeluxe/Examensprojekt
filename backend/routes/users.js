import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all Users'});
// });

router.get('/:id', userController.getSingleuser);

// register
// router.post('/', userController.createUser);

// login
// router.post('/login', userController.login);

// router.delete('/:id', (req, res) => {
//     res.json({mssg: 'DELETE a user'});
// });

// router.patch('/:id', (req, res) => {
//     res.json({mssg: 'UPDATE a user'});
// });

export default router;