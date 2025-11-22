import { PetDetailToolbar } from "@/features/pets/components/pet-detail-toolbar";
import { PetOverviewScreen } from "@/features/pets/screens/pet-overview-screen";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

export type RootStackParamList = {
  petId: number;
};

export default function PetDetail() {
  const router = useRouter();
  const { petId, petName } = useLocalSearchParams<{
    petId: string;
    petName: string;
  }>();

  return (
    <>
      <PetOverviewScreen
        petId={petId}
        petName={petName}
        onBack={() => router.back()}
      />
      <PetDetailToolbar
        onAddWeight={() =>
          router.push({
            pathname: "/pets/[petId]/add-weight",
            params: { petId, petName },
          })
        }
        onBack={() => router.back()}
      />
    </>
  );
}
