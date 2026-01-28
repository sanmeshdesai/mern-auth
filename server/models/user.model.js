// mongodb configuration

import mongoose from "mongoose";
import { hashPassword } from "../utils/hash.js";

const userSchema = new mongoose.Schema(
    {
        //info
        name: { type: String, required: true, trim: true, },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true, },
        password: { type: String, minlength: 6, select: false },

        //auth
        authProviders: {
            googleId: { type: String, unique: true, sparse: true, default: null },
            githubId: { type: String, unique: true, sparse: true, default: null },
        },

        //check user verified
        isVerified: { type: Boolean, default: false },

        //roles
        role: { type: String, enum: ['user', 'admin'], default: 'user', }


    }, { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await hashPassword(this.password);
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User