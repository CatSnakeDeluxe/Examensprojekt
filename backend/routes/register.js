import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();

router.post('/', registerController.upload.single('file'), registerController.createUser);

export default router;