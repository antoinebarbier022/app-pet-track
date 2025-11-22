import { Image } from "expo-image";
import { EllipsisIcon, TrendingUp } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  image?: any;
  name: string;
  weight?: number;
  date?: Date | null;
}
export const PetHeader = ({ image, name, weight, date }: Props) => {
  return (
    <View
      style={{
        padding: 20,
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 20,
      }}
    >
      <View
        style={{
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
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 32, fontWeight: "bold", color: "#3A2109" }}
            >
              {name}
            </Text>
            <Pressable style={{ padding: 4, backgroundColor: "red" }}>
              <EllipsisIcon />
            </Pressable>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: date ? "space-between" : "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
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
            <View
              style={{
                ...styles.tag,
              }}
            >
              {date ? (
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color: "#8B480D",
                  }}
                >
                  {date.toLocaleTimeString("fr-FR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              ) : (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <TrendingUp size={14} color={"#8B480D"} />
                  <Text style={{ color: "#8B480D", fontWeight: "bold" }}>
                    1.9 kg
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: 16, marginTop: 16 },
  tag: {
    flexDirection: "row",

    backgroundColor: "#FDC692",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
