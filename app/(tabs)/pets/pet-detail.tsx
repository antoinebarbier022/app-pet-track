import { useDeletePet } from "@/features/pet/hooks/use-delete-pet";
import { usePetById } from "@/features/pet/hooks/use-pet-by-id";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo } from "react";
import { Button, Dimensions, Text, View } from "react-native";

import { LineChart } from "react-native-gifted-charts";

type RootStackParamList = {
  petId: number; // params attendus pour cette route
};

const dPoint = () => {
  return (
    <View
      style={{
        width: 14,
        height: 14,
        backgroundColor: "white",
        borderWidth: 3,
        borderRadius: 7,
        borderColor: "#07BAD1",
      }}
    />
  );
};

const lcomp = (val: string) => {
  return (
    <View style={{ width: 70, marginLeft: 7 }}>
      <Text style={{ color: "white", fontWeight: "bold" }}>{val}</Text>
    </View>
  );
};

export default function PetDetail() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();

  const pet = usePetById(Number(id));
  const deletePet = useDeletePet();

  const { width, height } = Dimensions.get("window");

  if (!pet.data) return <Text>Loading...</Text>;
  if (pet.error) throw Error("Pet not found");

  // Transforme les poids en données pour le graphique
  const chartData = useMemo(() => {
    return pet.data.weights.map((w, idx) => {
      // On ajoute un label tous les 2 ou 3 points pour ne pas surcharger
      const showLabel = idx % 2 === 0;
      return {
        value: w.weightKg,
        customDataPoint: dPoint,
        labelComponent: showLabel
          ? () =>
              lcomp(
                new Date(w.recordedAt).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "short",
                })
              )
          : undefined,
        hideDataPoint: !showLabel,
      };
    });
  }, [pet.data.weights]);

  return (
    <View style={{ backgroundColor: "#A9CEF4", flex: 1 }}>
      <Stack.Screen
        options={{
          title: name as string,
          headerStyle: { backgroundColor: "#A9CEF4" },
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

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {pet.data.name}
        </Text>
        <Text>Dernier poids: {pet.data.lastWeight?.weightKg ?? "N/A"} kg</Text>
      </View>

      <View style={{ flex: 1 }}>
        <LineChart
          isAnimated
          thickness={3}
          color="#352dc2ff"
          maxValue={Math.max(...pet.data.weights.map((w) => w.weightKg)) + 5}
          noOfSections={5}
          animateOnDataChange
          animationDuration={1000}
          areaChart
          pointerConfig={{
            pointerStripColor: "#888",
            pointerLabelComponent: (items: any[]) => {
              console.log("Pointer label component:", items);
              return (
                <View
                  style={{
                    height: 120,
                    width: 100,
                    backgroundColor: "#282C3E",
                    borderRadius: 4,
                    justifyContent: "center",
                    paddingLeft: 16,
                  }}
                >
                  <Text style={{ color: "lightgray", fontSize: 12 }}>kg</Text>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {items[0].value}
                  </Text>
                </View>
              );
            },
          }}
          data={chartData}
          startFillColor={"rgba(84, 134, 234, 1)"}
          endFillColor={"rgba(84, 87, 234, 1)"}
          startOpacity={0.4}
          endOpacity={0.1}
          spacing={22}
          backgroundColor="transparent"
          rulesColor="gray"
          rulesType="solid"
          initialSpacing={10}
          xAxisColor="#000"
          verticalLinesColor="#07BAD1"
          verticalLinesThickness={2}
          width={width * 0.8}
          yAxisLabelSuffix="kg"
          yAxisLabelWidth={40}
          yAxisThickness={0}
        />
      </View>

      <Button
        title="Ajouter un poids"
        onPress={() => {
          router.push({
            pathname: "./add-weight",
            params: { petId: pet.data?.id },
          });
        }}
      />

      <StatusBar style="light" />
    </View>
  );
}
