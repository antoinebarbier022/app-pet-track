import { pets } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";

export function usePets() {
  const db = useDrizzle();
  const result = useLiveQuery(db.select().from(pets));

  return {
    data: result.data,
    error: result.error,
    updatedAt: result.updatedAt,
  };
}
