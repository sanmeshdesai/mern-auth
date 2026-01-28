import dotenv from 'dotenv';

dotenv.config()

const env = {
    NODE_ENV : process.env.NODE_ENV || 'dvelopment',
    PORT : process.env.PORT || 4000,

    //database
    MONGO_URI : process.env.MONGO_URI,
    
};

const requiredVars = [
    "MONGO_URI"
];

requiredVars.forEach((key) => {
    if(!env[key]) {
        throw new Error(`Missing environment veriable: ${key}`);
    }
});


export default env