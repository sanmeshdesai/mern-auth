import User from '../models/user.model.js'

export const registerUser = async({ name, email, password }) => {
    
    //check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already registered');
    }

    const user = await User.create({
        name, email, password, isVerified: false,
    });

    return user;

};