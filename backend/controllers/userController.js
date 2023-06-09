import userModel from '../models/userModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' });
}

// get a single user
const getSingleUser = async(req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No user Found'});
  }

  const singleUser = await userModel.findById(id);

  if(!singleUser) {
      return res.status(404).json({error: 'No user Found'});
  }

  // console.log("SINGLEUSER:", singleUser);
  res.status(200).json(singleUser);
}
  
// login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await userModel.login(username, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

// signup a user
const signupUser = async (req, res) => {
const { email, username, password, description } = req.body;
const { filename } = req.file;

// console.log('REQUEST VALUES:', email, username, password, req.file);

  try {
    const user = await userModel.signup(email, username, password, description, filename);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({user, token});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
}

export default { getSingleUser, signupUser, loginUser }