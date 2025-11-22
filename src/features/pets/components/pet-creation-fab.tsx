import { Plus } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPress: () => void;
}
export const PetCreationFab = ({ onPress }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#FCD6B0",
        borderRadius: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: insets.bottom, // distance par rapport au bas de l'écran
        alignSelf: "center", // centre horizontalement
        width: 68,
        height: 68,
        elevation: 5, // ombre Android
        shadowColor: "#000", // ombre iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      }}
    >
      <Plus size={32} color="#3A2109" />
    </TouchableOpacity>
  );
};
