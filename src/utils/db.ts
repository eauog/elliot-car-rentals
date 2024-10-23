import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'connection-string';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable');
}

// let cached = global.mongoose;
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
