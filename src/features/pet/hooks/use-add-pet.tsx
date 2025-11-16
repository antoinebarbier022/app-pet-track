import { pets } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { Pet } from "../types";

type NewPet = Omit<Pet, "id">;

export function useAddPet() {
  const db = useDrizzle();

  const addPet = async (pet: NewPet) => {
    db.insert(pets).values(pet).run();
  };

  return addPet;
}
