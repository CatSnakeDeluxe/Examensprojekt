import express from 'express';
import userController from '../controllers/userController.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all Users'});
// });

// router.get('/:id', userController.getSingleuser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './public/uploads/');
  },
  filename: (req, file, cb) => {
      cb(null, uuidv4() + file.originalname);
  }
});

let upload = multer({ storage: storage, limits: {filesize: 300000 }});

// register
router.post('/login', userController.loginUser);

// login
router.post('/signup', upload.single('file'), userController.signupUser);

// router.delete('/:id', (req, res) => {
//     res.json({mssg: 'DELETE a user'});
// });

// router.patch('/:id', (req, res) => {
//     res.json({mssg: 'UPDATE a user'});
// });

export default router;