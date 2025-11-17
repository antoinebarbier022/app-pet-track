import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFound() {
  return (
    <SafeAreaView>
      <Text>Not Found</Text>
      <Link href={"/"}>back to Home</Link>
    </SafeAreaView>
  );
}
