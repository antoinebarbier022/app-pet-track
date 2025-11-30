import robotoFont from "@/assets/fonts/Roboto/static/Roboto-Bold.ttf";
import catImage from "@/assets/images/avatars/cat.png";
import { Card } from "@/components/ui/card";
import { RangeSelector } from "@/components/ui/range-selector";
import { PetHeader } from "@/features/pets/components/pet-header";
import { useDeletePet } from "@/features/pets/hooks/use-delete-pet";
import { usePetById } from "@/features/pets/hooks/use-pet-by-id";
import { Point, WeightChart } from "@/features/weights/components/weight-chart";
import { Canvas, Text as SkText, useFont } from "@shopify/react-native-skia";
import { endOfDay, startOfDay, subDays, subMonths, subYears } from "date-fns";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
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

  const date = useDerivedValue(() => {
    return new Date(chartPress.state.x.value.value).toLocaleString();
  }, [chartPress.state]);

  const [selectedRange, setSelectedRange] = useState("7d");

  const [selectedWeight, setSelectedWeight] = React.useState<{
    isActive: boolean;
    value: number | null;
  }>({ isActive: false, value: null });
  const [showSelectedPoint, setShowSelectedPoint] =
    React.useState<boolean>(false);

  const pet = usePetById(Number(petId));
  const deletePet = useDeletePet();

  const startDate = useMemo(() => {
    const now = new Date();
    switch (selectedRange) {
      case "7d":
        return startOfDay(subDays(now, 7));
      case "1m":
        return startOfDay(subMonths(now, 1));
      case "6m":
        return startOfDay(subMonths(now, 6));
      case "1y":
        return startOfDay(subYears(now, 1));
      case "all":
      default:
        return undefined;
    }
  }, [selectedRange]);

  const endDate = useMemo(() => {
    if (selectedRange === "all") return undefined;
    return endOfDay(new Date());
  }, [selectedRange]);

  const chartData = useMemo(() => {
    const filtered = pet.data?.weights.filter(
      (item) =>
        (!startDate || item.recordedAt >= startDate) &&
        (!endDate || item.recordedAt <= endDate)
    );
    return filtered?.map((w) => {
      return {
        day: w.recordedAt.getTime(),
        weight: Number(w.weightKg),
      } as Point;
    });
  }, [pet.data?.weights, startDate, endDate]);

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
      <Canvas style={{ width: 300, height: 30 }}>
        <SkText
          text={chartPress.isActive ? value : ""}
          font={chartFont}
          color={"#603C18"}
          opacity={0.6}
          x={20}
          y={20}
        ></SkText>
        <SkText
          text={chartPress.isActive ? date : ""}
          font={chartFont}
          color={"#603C18"}
          opacity={0.6}
          x={100}
          y={20}
        ></SkText>
      </Canvas>

      <View>
        {!chartData || chartData.length === 0 ? (
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
          <View style={{ gap: 20 }}>
            <WeightChart
              weightGoal={4}
              data={chartData}
              chartPress={chartPress}
            />
            <View style={{ paddingHorizontal: 20 }}>
              <RangeSelector
                selected={selectedRange}
                data={[
                  {
                    label: "7J",
                    value: "7d",
                  },
                  {
                    label: "1M",
                    value: "1m",
                  },
                  {
                    label: "6M",
                    value: "6m",
                  },
                  {
                    label: "1A",
                    value: "1y",
                  },
                  {
                    label: "Tout",
                    value: "all",
                  },
                ]}
                onPress={(value) => setSelectedRange(value)}
              />
            </View>
          </View>
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
          <Card style={{ flex: 2 }}>
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
