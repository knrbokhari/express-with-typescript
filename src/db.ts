import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URI }: any = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();