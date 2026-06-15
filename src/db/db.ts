import { drizzle } from "drizzle-orm/neon-http";
import { config } from "../config/config.js";
import { neon } from "@neondatabase/serverless";

if (!config.db_url) {
  throw new Error("DATABASE_URL is missing from .env");
}

const sql = neon(config.db_url);

export const db = drizzle(sql);
