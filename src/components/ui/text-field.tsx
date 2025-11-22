import { Text } from "react-native";

interface Props {
  defaultValue?: string | undefined;
  onChangeText: (value: string) => void;
}
export const TextField = ({ defaultValue, onChangeText }: Props) => {
  return <Text>TextInput</Text>;
};
