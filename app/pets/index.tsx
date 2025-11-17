import { PetList } from "@/features/pet/components/pet-list";
import { usePets } from "@/features/pet/hooks/use-pets";
import { Link, Stack } from "expo-router";

import { StatusBar } from "expo-status-bar";
import { Plus } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function Index() {
  const { data } = usePets();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#170D03",
      }}
    >
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

      <PetList data={data || []} />

      <Link href="/pets/add-pet" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: "#FCD6B0",

            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: insets.bottom, // distance par rapport au bas de l'écran
            alignSelf: "center", // centre horizontalement

            width: 68,
            height: 68,

            elevation: 5, // ombre Android
            shadowColor: "#000", // ombre iOS
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
        >
          <Plus size={32} color="#3A2109" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
