import mongoose from 'mongoose';
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: "email must be filled in",
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    username: {
        type: String,
        required: "username must be filled in",
        lowercase: true,
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, "is invalid"]
    },
    password: {
        type: String,
        required: "password must be filled in",
        minLength: 4,
        maxLength: 36
    },
    profilePicture: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.pre("save", function (next) {
    try {   
        if (!this.isModified("password")) {
            return next();
        }
        // hash password
        this.password = bcrypt.hashSync(this.password, 10);
        
        // after hashing continue with save()
        next();
    } catch (err) {
        throw new Error("Inccorect password", err);
    }
}, { collection: "user" });

userSchema.methods.comparePassword = async function (inputPassword, hashedPassword) {
    try {
        return await bcrypt.compare(inputPassword, hashedPassword);
    } catch (err) {
        throw new Error("Incorrect password", err);
    }
}

const userModel = mongoose.model("user", userSchema);

export default userModel;