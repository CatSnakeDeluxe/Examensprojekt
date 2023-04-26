import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();

const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await userModel.findOne({ username });

        if (!user) {
            throw new Error("Wrong Username");
        }

        const checkUserAuth = await user.comparePassword(password, user.password);

        if (!checkUserAuth) {
            throw new Error("Wrong Password");
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT secret is not defined');
        }

        const token = jwt.sign({
            userId: user.id
        },  process.env.JWT_SECRET, {
            expiresIn: '3m'
        });
    
        // Return the token
        res.status(200).json({
            token
        });

        // res.status(200).json({
        //     token,
        //     user
        // });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export default { login }