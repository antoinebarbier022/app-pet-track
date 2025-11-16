import { pets } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { eq } from "drizzle-orm";
import { Pet } from "../types";

type NewPet = Omit<Pet, "id">;

export function useEditPet() {
  const db = useDrizzle();

  const editPet = async (id: Pet["id"], pet: NewPet) => {
    db.update(pets).set(pet).where(eq(pets.id, id)).run();
  };

  return editPet;
}
