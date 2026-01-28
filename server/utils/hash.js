import bcrypt from 'bcryptjs';

const SALT_ROUND = 10;


// hash password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return bcrypt.hash(password, salt);    
};


// compare password
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
