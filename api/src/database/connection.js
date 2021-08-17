import { Database } from 'arangojs';
import 'dotenv/config';

const db = new Database();

db.useBasicAuth(process.env.DB_USER, process.env.DB_PASS);

export default db;