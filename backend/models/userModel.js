import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import validator from 'validator';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: "email must be filled in",
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    username: {
        type: String,
        required: "username must be filled in",
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, "is invalid"]
    },
    password: {
        type: String,
        required: "password must be filled in",
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.statics.signup = async function(email, username, password) {

    // validation
    if (!email || !username || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    // if (!validator.isStrongPassword(password)) {
    //   throw Error('Password not strong enough')
    // }
  
    const exists = await this.findOne({ email });
  
    if (exists) {
      throw Error('Email already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({ email, username, password: hash })
  
    return user
  }
  
  // static login method
  userSchema.statics.login = async function(username, password) {
  
    if (!username || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ username })
    if (!user) {
      throw Error('Incorrect username')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }

const userModel = mongoose.model("user", userSchema);

export default userModel;