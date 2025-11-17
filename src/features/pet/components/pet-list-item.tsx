import CatImage from "@/assets/images/avatars/cat.png";
import { Image } from "expo-image";

import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
interface Props {
  petId: number;
  name: string;
}
export const PetListItem = ({ petId: id, name }: Props) => {
  return (
    <Link
      asChild
      href={{
        pathname: "/pets/pet-detail",
        params: { id, name },
      }}
      style={{
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#9E7245",
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: "#FCD6B0",
      }}
    >
      <TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Image
            source={CatImage}
            contentFit="contain"
            style={{ width: 40, height: 54 }}
          />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
            <Text>3.5 kg</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
