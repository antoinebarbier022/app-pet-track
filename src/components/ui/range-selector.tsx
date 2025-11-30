import { useId } from "react";
import { View } from "react-native";
import { Chip } from "./chip";

interface Props {
  selected: string;
  data: { label: string; value: string }[];
  onPress: (value: string) => void;
}
export const RangeSelector = ({ data, selected, onPress }: Props) => {
  const id = useId();

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 8,
      }}
    >
      {data.map((item) => (
        <Chip
          key={`${id}-${item.value}`}
          fullWidth
          active={selected === item.value}
          onPress={() => onPress(item.value)}
        >
          {item.label}
        </Chip>
      ))}
    </View>
  );
};
