// File: ./pages/api/adminLogin.js
import dbConnect from '@/db/mongoose';
import Admin from '@/models/admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    console.log('req.method', req.method)
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { username, password } = req.body;

    // Connect to the database
    const conn = await dbConnect();

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

        // Create a JWT token for authentication
        const token = jwt.sign({ username: admin.username }, 'your-secret-key');
        admin.password = undefined;
        return res.status(200).json({ token, admin });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
