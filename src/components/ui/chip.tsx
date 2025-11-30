import { PropsWithChildren } from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  active?: boolean;
  onPress: () => void;
  fullWidth: boolean;
}
export const Chip = ({
  children,
  active,
  fullWidth,
  onPress,
}: PropsWithChildren<Props>) => {
  return (
    <TouchableOpacity
      style={{
        flex: fullWidth ? 1 : undefined,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: active ? "#3A2109" : "#EEC399",
        borderRadius: 9999,
      }}
      onPress={onPress}
    >
      <Text
        style={{ color: active ? "#FFF8F1" : "#3A2109", textAlign: "center" }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
