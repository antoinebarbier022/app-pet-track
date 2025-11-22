import { pets } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { eq } from "drizzle-orm";
import { Pet } from "../types";

export function useDeletePet() {
  const db = useDrizzle();

  const deletePet = async (id: Pet["id"]) => {
    db.delete(pets).where(eq(pets.id, id)).run();
  };

  return deletePet;
}
