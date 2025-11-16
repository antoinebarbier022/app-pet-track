import { pets, weights } from "@/db/schema";

export type Pet = typeof pets.$inferSelect;
export type Weight = typeof weights.$inferSelect;

export type PetWithWeights = Pet & {
    lastWeight: Omit<Weight, "id" | "petId"> | null;
    weights: Omit<Weight, "id" | "petId">[];
}