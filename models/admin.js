// models/User.js
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

let Admin;

try {
  Admin = mongoose.model('Admin');
} catch (e) {
  Admin = mongoose.model('Admin', adminSchema);
}

export default Admin;
