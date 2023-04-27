import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' });
}
  
  // login a user
  const loginUser = async (req, res) => {
    const {username, password} = req.body
  
    try {
      const user = await userModel.login(username, password);
  
      // create a token
      const token = createToken(user._id);
  
      res.status(200).json({username, token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  }
  
  // signup a user
  const signupUser = async (req, res) => {
    const {email, username, password} = req.body
  
    try {
      const user = await userModel.signup(email, username, password);
  
      // create a token
    const token = createToken(user._id);
  
      res.status(200).json({email, username, token});
    } catch (error) {
      res.status(400).json({error: error.message});
    }
}

export default { signupUser, loginUser }