import robotoFont from "@/assets/fonts/Roboto/static/Roboto-Bold.ttf";
import catImage from "@/assets/images/avatars/cat.png";
import { Card } from "@/components/ui/card";
import { PetHeader } from "@/features/pet/components/pet-header";
import { PetWeightChart } from "@/features/pet/components/pet-weight-chart";
import { useDeletePet } from "@/features/pet/hooks/use-delete-pet";
import { usePetById } from "@/features/pet/hooks/use-pet-by-id";
import { Canvas, Text as SkText, useFont } from "@shopify/react-native-skia";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { List } from "lucide-react-native";
import React from "react";
import { Alert, Pressable, Text, TouchableOpacity, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useChartPressState } from "victory-native";

export type RootStackParamList = {
  petId: number; // params attendus pour cette route
};

export default function PetDetail() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const chartFont = useFont(robotoFont, 24);

  const chartPress = useChartPressState({ x: 0, y: { weight: 0 } });

  const value = useDerivedValue(() => {
    return chartPress.state.y.weight.value.value.toFixed(1) + " kg";
  }, [chartPress.state]);

  const [selectedWeight, setSelectedWeight] = React.useState<{
    isActive: boolean;
    value: number | null;
  }>({ isActive: false, value: null });
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
        }}
      />

      <Pressable
        style={{ position: "absolute", bottom: 140, right: 0 }}
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
      >
        <Text style={{ padding: 14, backgroundColor: "red" }}>Supprimer</Text>
      </Pressable>

      <PetHeader
        image={catImage}
        name={pet.data.name}
        weight={
          selectedWeight.isActive && selectedWeight.value
            ? selectedWeight.value
            : pet.data.lastWeight?.weightKg
        }
        date={showSelectedPoint ? new Date() : null}
      />
      <Canvas style={{ width: 200 }}>
        <SkText
          text={chartPress.isActive ? value : ""}
          font={chartFont}
          color={"#603C18"}
          opacity={0.6}
          x={20}
          y={20}
        ></SkText>
      </Canvas>

      <View>
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
          <>
            {/* <PetWeightChart
              data={pet.data}
              onPointLeave={() => {
                setShowSelectedPoint(false);
                // console.log("Pointer left");
              }}
              onPointEnter={() => {
                console.log("Pointer enter");
                //setShowSelectedPoint(true);
              }}
              onPointPress={(data) => {
                //console.log("Pointer : ", data);
                //setSelectedPoint(data);
              }}
            /> */}
            <PetWeightChart data={pet.data} chartPress={chartPress} />
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 8,
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Card style={{ flex: 1 }}>
            <Card.Title>Dernière pesée</Card.Title>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#61482F" }}
            >
              il y a une semaine
            </Text>
          </Card>

          <Card style={{ flex: 1 }}>
            <Card.Title>Objectif</Card.Title>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#61482F" }}
            >
              4 kg
            </Text>
          </Card>
        </View>
        <Card>
          <Card.Title>Prochain rappel</Card.Title>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#61482F" }}>
            dans 3 jours
          </Text>
        </Card>
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
            style={{ color: "#f7dfc8ff", fontSize: 20, fontWeight: "bold" }}
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
