import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function PetLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: "#FCD6B0",
          },

          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="add-pet"
          options={{ presentation: "modal", title: "Ajouter un animal" }}
        />
        <Stack.Screen
          name="add-weight"
          options={{ presentation: "modal", title: "Ajouter un poids" }}
        />
      </Stack>
    </>
  );
}
