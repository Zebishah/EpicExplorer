import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

// Instead of a hardcoded connection string, use the environment variable
const mongoUri = process.env.MONGOURI;

const connectDB = async () => {
    if (!mongoUri) {
        throw new Error('MONGOURI is required to connect to MongoDB');
    }

    await connect(mongoUri, {
        serverSelectionTimeoutMS: Number(process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS || 5000),
    });
    console.log('Database connected');
}

export default connectDB;
