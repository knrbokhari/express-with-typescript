import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

expect const client = new MongoClient(MONGO_URI)
expect const db = client.db()