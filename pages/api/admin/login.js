// pages/api/login.js
import connectToDatabase from '../../../db/mongoose';
import Admin from '../../../models/admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  await connectToDatabase();

  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }
  const token = jwt.sign({ username: admin.id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expiration time (e.g., 1 hour)
  });
  admin.password = undefined
  return res.status(200).json({ message: 'Login successful.', data: { token, admin } });
}
