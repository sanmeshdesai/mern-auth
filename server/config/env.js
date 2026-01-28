import dotenv from 'dotenv';

dotenv.config()

const env = {
    NODE_ENV : process.env.NODE_ENV || 'dvelopment',
    PORT : process.env.PORT || 4000,

    //database
    MONGO_URI : process.env.MONGO_URI,
    
    //Email
    EMAIL_HOST : process.env.EMAIL_HOST, 
    EMAIL_PORT : process.env.EMAIL_PORT,
    EMAIL_USER : process.env.EMAIL_USER,
    EMAIL_PASS : process.env.EMAIL_PASS,
    EMAIL_FROM : process.env.EMAIL_FROM,
};

const requiredVars = [
    "MONGO_URI",
    "EMAIL_USER",
    "EMAIL_PASS",
];

requiredVars.forEach((key) => {
    if(!env[key]) {
        throw new Error(`Missing environment veriable: ${key}`);
    }
});


export default env