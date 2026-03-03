import { defineConfig } from 'drizzle-kit'
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle", 
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_N1sXp5wIQMbz@ep-patient-firefly-a5n9yuiq-pooler.us-east-2.aws.neon.tech/ai-interview-mock?sslmode=require',
  }
})