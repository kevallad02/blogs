// utils/db.js
import mongoose from 'mongoose';

const { MONGODB_URI } = process.env;

async function connectToDatabase() {
  if (mongoose.connections[0].readyState) {
    return mongoose.connections[0];
  }

  return mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default connectToDatabase;
