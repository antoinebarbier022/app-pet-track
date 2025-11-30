import { NewPetScreen } from "@/screens/new-pet-screen";
import { useRouter } from "expo-router";

export default function CreatePetRoute() {
  const router = useRouter();
  return <NewPetScreen onCreated={() => router.back()} />;
}
