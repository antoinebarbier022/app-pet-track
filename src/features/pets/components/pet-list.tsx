import { FlatList, Text, View } from "react-native";
import { Pet } from "../types";
import { PetListItem } from "./pet-list-item";

interface Props {
  data: Pet[];
  onPetPress: (petId: string, petName: string) => void;
}

export const PetList = ({ data, onPetPress }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(pet) => String(pet.id)}
      renderItem={({ item: pet }) => (
        <PetListItem
          petId={String(pet.id)}
          petName={pet.name}
          petWeight={"NaN"}
          onPress={onPetPress}
        />
      )}
      ListEmptyComponent={() => <Text>Empty</Text>}
      ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 120,
      }}
      style={{
        width: "100%",
        flex: 1,
      }}
    />
  );
};
