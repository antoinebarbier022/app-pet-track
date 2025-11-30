import { PetList } from "@/features/pets/components/pet-list";
import { usePets } from "@/features/pets/hooks/use-pets";

import { View } from "react-native";

interface Props {
  onPetPress: (petId: string, petName: string) => void;
}
export const PetListScreen = ({ onPetPress }: Props) => {
  const { data } = usePets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#170D03",
      }}
    >
      <PetList data={data || []} onPetPress={onPetPress} />
    </View>
  );
};
