import { PetCreationFab } from "@/features/pets/components/pet-creation-fab";
import { PetListScreen } from "@/screens/pet-list-screen";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

export default function Index() {
  const router = useRouter();
  return (
    <>
      <StatusBar style="light" />
      <Stack.Screen
        options={{
          headerShown: true,
          navigationBarHidden: true,
          title: "Mes compagnons",
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: "#170D03",
          },

          headerTitle: (props) => (
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Text
                style={{ color: "#FAEBDD", fontSize: 24, fontWeight: "bold" }}
              >
                {props.children}
              </Text>
            </View>
          ),
          animation: "fade",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
          headerTitleAlign: "left",
        }}
      />
      <PetListScreen
        onPetPress={(petId: string, petName: string) =>
          router.push({
            pathname: "/pets/[petId]",
            params: { petId, petName },
          })
        }
      />
      <PetCreationFab
        onPress={() => router.push({ pathname: "/pets/create" })}
      />
    </>
  );
}
