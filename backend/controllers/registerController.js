import userModel from '../models/userModel.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
  
const upload = multer({ storage: storage });

const createUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const newUser = await userModel.create({ email, username, password });
      
        // handle file upload
        upload.single('file')(req, res, function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
          
            // Add the path to the uploaded file to the user object
            newUser.file = req.file.path;
          
            // Save the user object with the file path
            newUser.save();
          
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export default { createUser, upload }