import { weights } from "@/db/schema";
import { useDrizzle } from "@/hooks/use-drizzle";
import { Weight } from "../types";

type NewWeight = Omit<Weight, "id" | "petId">;

export function useAddWeightToPet() {
  const db = useDrizzle();

  const addWeight = ({
    petId,
    weight,
  }: {
    petId: number;
    weight: NewWeight;
  }) => {
    db.insert(weights)
      .values({ ...weight, petId })
      .run();
  };

  return addWeight;
}
