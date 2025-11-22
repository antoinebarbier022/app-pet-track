import { pets, weights } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { asc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Pet, PetWithWeights } from "../types";

export function usePetById(id: Pet["id"]) {
  const db = useDrizzle();

  // Récupérer le pet
  const { data: petRow, error: petError } = useLiveQuery(
    db.select().from(pets).where(eq(pets.id, id))
  );

  // Récupérer tous les poids de ce pet
  const { data: weightRows, error: weightError } = useLiveQuery(
    db
      .select({
        recordedAt: weights.recordedAt,
        weightKg: weights.weightKg,
      })
      .from(weights)
      .where(eq(weights.petId, id))
      .orderBy(asc(weights.recordedAt))
  );

  if (!petRow || petRow.length === 0) return { data: null };

  const lastWeightRow = weightRows?.at(-1);

  const pet: PetWithWeights = {
    id: petRow[0].id,
    name: petRow[0].name,
    type: petRow[0].type,
    birthDate: petRow[0].birthDate,
    lastWeight:
      lastWeightRow && lastWeightRow.recordedAt && lastWeightRow.weightKg
        ? {
            recordedAt: lastWeightRow.recordedAt,
            weightKg: lastWeightRow.weightKg,
          }
        : null,
    weights:
      weightRows?.map((row) => ({
        weightKg: row.weightKg,
        recordedAt: row.recordedAt,
      })) || [],
  };

  return { data: pet, error: petError || weightError };
}
