import { DateTimePicker, Host } from "@expo/ui/swift-ui";
import { background, cornerRadius } from "@expo/ui/swift-ui/modifiers";

interface Props {
  initialDate?: Date | null | undefined;
  onDateSelected?: ((date: Date) => void) | undefined;
}
export const DatePicker = ({ initialDate, onDateSelected }: Props) => {
  return (
    <Host matchContents>
      <DateTimePicker
        onDateSelected={onDateSelected}
        displayedComponents="date"
        color="#77512A"
        modifiers={[background("#F7D3AE"), cornerRadius(10)]}
        initialDate={initialDate && initialDate.toISOString()}
        variant="automatic"
      />
    </Host>
  );
};
