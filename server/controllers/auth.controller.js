import { registerUser } from "../services/auth.service.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser({ name, email, password });
        res.status(201).json({
            message: 'User registered successfully',
            userId: user._id,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};