import { List } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onBack: () => void;
  onAddWeight: () => void;
}

export const PetDetailToolbar = ({ onBack, onAddWeight }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        gap: 16,
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: insets.bottom,
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "#170D03",
          borderRadius: 9999,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 24,
          height: 68,
        }}
        onPress={onAddWeight}
      >
        <Text style={{ color: "#f7dfc8ff", fontSize: 20, fontWeight: "bold" }}>
          Nouveau poids
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#EEC399",

          borderRadius: 9999,

          alignItems: "center",
          justifyContent: "center",

          alignSelf: "center", // centre horizontalement
          paddingHorizontal: 24,
          height: 68,
          width: 68,

          borderWidth: 2,
          borderColor: "#DBB58E",
        }}
        onPress={onBack}
      >
        <List size={24} strokeWidth={3} color="#3A2109" />
      </TouchableOpacity>
    </View>
  );
};
