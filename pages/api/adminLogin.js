import Admin from '@/models/admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
require('dotenv').config()
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    try {
        // Find the admin by username
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: admin.id }, process.env.JWT_SECRET, {
            expiresIn: '30d', // Token expiration time (e.g., 1 hour)
        });
        // Create a JWT token for authentication
        // const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET);
        admin.password = undefined;
        return res.status(200).json({ message: 'Login successful', data: { token, admin } });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
