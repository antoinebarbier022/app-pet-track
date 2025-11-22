import { Host, TextField as SwTextField } from "@expo/ui/swift-ui";

interface Props {
  defaultValue?: string | undefined;
  onChangeText: (value: string) => void;
}
export const TextField = ({ defaultValue, onChangeText }: Props) => {
  return (
    <Host matchContents>
      <SwTextField
        placeholder="0"
        autocorrection={false}
        keyboardType="ascii-capable-number-pad"
        defaultValue={defaultValue}
        onChangeText={onChangeText}
      />
    </Host>
  );
};
