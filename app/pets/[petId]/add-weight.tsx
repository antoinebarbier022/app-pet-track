import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

import { AddNewWeightScreen } from "@/features/weights/screens/add-new-weight-screen";

export default function AddWeight() {
  const router = useRouter();
  const { petId, petName } = useLocalSearchParams<{
    petId: string;
    petName: string;
  }>();

  return (
    <AddNewWeightScreen
      petId={petId}
      petName={petName}
      onClose={() => router.back()}
    />
  );
}
