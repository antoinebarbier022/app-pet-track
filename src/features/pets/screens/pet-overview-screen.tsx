import robotoFont from "@/assets/fonts/Roboto/static/Roboto-Bold.ttf";
import catImage from "@/assets/images/avatars/cat.png";
import { Card } from "@/components/ui/card";
import { PetHeader } from "@/features/pets/components/pet-header";
import { useDeletePet } from "@/features/pets/hooks/use-delete-pet";
import { usePetById } from "@/features/pets/hooks/use-pet-by-id";
import { WeightChart } from "@/features/weights/components/weight-chart";
import { Canvas, Text as SkText, useFont } from "@shopify/react-native-skia";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChartPressState } from "victory-native";

interface Props {
  petId: string;
  petName: string;
  onBack: () => void;
}

export const PetOverviewScreen = ({ petId, petName, onBack }: Props) => {
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

  const pet = usePetById(Number(petId));
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
          title: petName as string,
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
            await deletePet(Number(petId));
            onBack();
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
            <WeightChart data={pet.data} chartPress={chartPress} />
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
    </SafeAreaView>
  );
};
