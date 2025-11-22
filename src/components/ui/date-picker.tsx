import { Text, View } from "react-native";

interface Props {
  initialDate?: Date | null | undefined;
  onDateSelected?: ((date: Date) => void) | undefined;
}
export const DatePicker = ({ initialDate, onDateSelected }: Props) => {
  return (
    <View>
      <Text>other plateformes</Text>
    </View>
  );
};
