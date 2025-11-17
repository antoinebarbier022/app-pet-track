import { PetHeader } from "@/features/pet/components/pet-header";
import { useDeletePet } from "@/features/pet/hooks/use-delete-pet";
import { usePetById } from "@/features/pet/hooks/use-pet-by-id";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";

import CatImage from "@/assets/images/avatars/cat.png";
import {
  PetWeightChart,
  Point,
} from "@/features/pet/components/pet-weight-chart";
import { List } from "lucide-react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export type RootStackParamList = {
  petId: number; // params attendus pour cette route
};

export default function PetDetail() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const [selectedPoint, setSelectedPoint] = React.useState<Point | null>(null);
  const [showSelectedPoint, setShowSelectedPoint] =
    React.useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const pet = usePetById(Number(id));
  const deletePet = useDeletePet();

  if (!pet.data) return <Text>Loading...</Text>;
  if (pet.error) throw Error("Pet not found");

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{ backgroundColor: "#FCD6B0", flex: 1 }}
    >
      <StatusBar style="dark" />
      <Stack.Screen
        options={{
          headerShown: false,
          title: name as string,
          headerTintColor: "#000",
          headerRight: () => (
            <Button
              title="Supprimer"
              onPress={async () => {
                await deletePet(Number(id));
                router.back();
              }}
            />
          ),
        }}
      />

      <PetHeader
        image={CatImage}
        name={pet.data.name}
        weight={
          showSelectedPoint && selectedPoint
            ? selectedPoint.value
            : pet.data.lastWeight?.weightKg
        }
      />
      <Button
        title="Supprimer"
        onPress={async () => {
          const confirmDelete = (itemName: string, onConfirm: () => void) => {
            Alert.alert(
              "Confirmation", // titre de l'alerte
              `Voulez-vous vraiment supprimer ${itemName} ?`, // message
              [
                {
                  text: "Annuler",
                  style: "cancel", // style spécial pour iOS
                },
                {
                  text: "Supprimer",
                  style: "destructive", // bouton rouge sur iOS
                  onPress: onConfirm, // action si l'utilisateur confirme
                },
              ],
              { cancelable: true } // permet de fermer l'alerte en tapant en dehors
            );
          };
          confirmDelete(pet.data.name, async () => {
            await deletePet(Number(id));
            router.back();
          });
        }}
      />

      <View style={{ flex: 1 }}>
        {pet.data.weights.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 32,
              fontSize: 16,
              color: "#3A2109",
            }}
          >
            Aucun poids enregistré pour le moment.
          </Text>
        ) : (
          <PetWeightChart
            data={pet.data}
            onPointLeave={() => {
              setShowSelectedPoint(false);
              console.log("Pointer left");
            }}
            onPointEnter={() => setShowSelectedPoint(true)}
            onPointPress={(data) => {
              setSelectedPoint(data);
            }}
          />
        )}
      </View>

      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 16,
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: insets.bottom,
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#170D03",
            borderRadius: 9999,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            height: 68,
          }}
          onPress={() => {
            router.push({
              pathname: "./add-weight",
              params: { petId: pet.data?.id, name: pet.data?.name },
            });
          }}
        >
          <Text
            style={{ color: "#FCD6B0", fontSize: 20, fontWeight: "semibold" }}
          >
            Nouveau poids
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EEC399",

            borderRadius: 9999,

            alignItems: "center",
            justifyContent: "center",

            alignSelf: "center", // centre horizontalement
            paddingHorizontal: 24,
            height: 68,
            width: 68,

            borderWidth: 2,
            borderColor: "#DBB58E",
          }}
          onPress={() => {
            router.back();
          }}
        >
          <List size={24} strokeWidth={3} color="#3A2109" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
