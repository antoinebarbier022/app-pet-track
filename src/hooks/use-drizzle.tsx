import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";

export function useDrizzle() {
  const sqlite = useSQLiteContext();
  const db = drizzle(sqlite, { schema });
  return db;
}
