import CatImage from "@/assets/images/avatars/cat.png";
import { Image } from "expo-image";

import { Text, TouchableOpacity, View } from "react-native";
interface Props {
  petId: string;
  petName: string;
  petWeight: string;
  onPress: (petId: string, petName: string) => void;
}
export const PetListItem = ({ petId, petName, petWeight, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(petId, petName)}
      style={{
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#9E7245",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FCD6B0",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <Image
          source={CatImage}
          contentFit="contain"
          style={{ width: 40, height: 54 }}
        />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{petName}</Text>
          <Text>{petWeight} kg</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
