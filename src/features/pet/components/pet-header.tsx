import { Image } from "expo-image";
import { Text, View } from "react-native";

interface Props {
  image?: any;
  name: string;
  weight?: number;
}
export const PetHeader = ({ image, name, weight }: Props) => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Image
        source={
          image
            ? image
            : {
                uri: "https://reactnative.dev/docs/assets/p_cat2.png",
              }
        }
        contentFit="contain"
        style={{ width: 60, height: 80 }}
      />
      <View>
        <Text style={{ fontSize: 32, fontWeight: "bold", color: "#3A2109" }}>
          {name}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#603C18",
            opacity: 0.6,
          }}
        >
          {weight?.toFixed(1) ?? "N/A"} kg
        </Text>
      </View>
    </View>
  );
};
