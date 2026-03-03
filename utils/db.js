import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js';

// Hardcoded Neon database URL for Vercel deployment
const sql = neon("postgresql:/neondb_owner:npg_N1sXp5wIQMbz@ep-patient-firefly-a5n9yuiq-pooler.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require");

export const db = drizzle(sql,{schema});