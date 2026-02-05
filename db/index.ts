import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const isProduction = process.env.NODE_ENV === "production";
const isInternalNetwork = connectionString.includes(".railway.internal");

const client = postgres(connectionString, {
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  ssl: { rejectUnauthorized: false },
  debug: (connection, query, params) => {
    console.log("DB Query:", query?.substring(0, 100));
  },
  onnotice: (notice) => console.log("DB Notice:", notice),
});
export const db = drizzle(client, { schema });
