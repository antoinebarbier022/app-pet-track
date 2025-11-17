import { FlatList, Text, View } from "react-native";
import { PetListItem } from "./pet-list-item";

interface Props {
  data: { id: number; name: string }[];
}
export const PetList = ({ data }: Props) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(pet) => String(pet.id)}
      renderItem={({ item: pet }) => (
        <PetListItem petId={pet.id} name={pet.name} />
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
