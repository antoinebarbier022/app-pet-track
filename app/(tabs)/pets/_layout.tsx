import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function PetLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
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
