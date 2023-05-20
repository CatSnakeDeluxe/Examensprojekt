import express from 'express';
import userController from '../controllers/userController.js';
import multer from 'multer';
import sharp from 'sharp-multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const storage =
sharp ({
  destination:(req, file, callback) => callback(null, "./public/uploads/"),
  imageOptions:{
  fileFormat: "jpg",
  quality: 80,
  resize: { width: 500, height: 500 },
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + file.originalname);
  }
});

const upload  =  multer({ storage });

// router.get('/', (req, res) => {
//     res.json({mssg: 'GET all Users'});
// });

router.get('/:id', userController.getSingleUser);



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