import { useAddWeightToPet } from "@/features/pet/hooks/use-add-weight-to-pet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddPet() {
  const router = useRouter();
  const [weightKg, setWeightKg] = useState("");
  const [recordedAt, setRecordedAt] = useState(new Date());
  const { petId, name } = useLocalSearchParams<{
    petId: string;
    name: string;
  }>();

  const addWeightToPet = useAddWeightToPet();

  const handleAdd = () => {
    if (!weightKg || !petId) {
      console.log("Missing weight or pet ID", { weightKg, petId });
      return;
    }
    addWeightToPet({
      petId: Number(petId),
      weight: { weightKg: Number(weightKg.replace(",", ".")), recordedAt },
    });

    console.log({ weightKg, recordedAt });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
        }}
      >
        <Text
          style={{
            width: "80%",
            fontSize: 32,
            fontWeight: "bold",
            color: "#170D03",
          }}
        >
          Nouveau poids de{"\u00A0"}
          {name}
        </Text>
        <Pressable
          style={{ padding: 16, borderRadius: 8 }}
          onPress={() => router.back()}
        >
          <ChevronDown size={32} />
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginHorizontal: "auto",
          backgroundColor: "#FDE2C8",
          justifyContent: "center",
          //alignItems: "center",
          outlineWidth: 2,
          outlineColor: "#9E7245",

          marginTop: 20,
          paddingVertical: 4,
          paddingHorizontal: 16,
          borderRadius: 20,
          gap: 0,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <Text
            style={{
              position: "absolute",
              fontSize: 54,
              textAlign: "right",
              color: "#9E7245",

              paddingHorizontal: 10,
              borderRadius: 8,
            }}
          >
            {weightKg}
          </Text>
          <TextInput
            autoFocus={false}
            focusable={true}
            placeholder="0"
            returnKeyType="done"
            placeholderTextColor="#D3A87C"
            style={{
              fontSize: 54,
              textAlign: "right",

              paddingHorizontal: 10,
              color: "transparent",
              width: "100%",
              flex: 1,

              borderRadius: 8,
              paddingVertical: 6,
            }}
            maxLength={6}
            value={weightKg}
            onChangeText={(value: string) => {
              // Supprime tout sauf chiffres et virgule
              let newValue = value.replace(/[^0-9,]/g, "");

              // Si l'utilisateur commence par une virgule, ajoute un 0 devant
              if (newValue.startsWith(",")) {
                newValue = "0" + newValue;
              }

              // Ne garder qu'une seule virgule
              const parts = newValue.split(",");
              if (parts.length > 2) {
                newValue = parts[0] + "," + parts[1];
              }

              // Limite à 2 chiffres avant la virgule
              if (parts[0].length > 2) {
                newValue =
                  parts[0].slice(0, 2) + (parts[1] ? "," + parts[1] : "");
              }

              // Limite à 3 chiffres après la virgule
              if (parts[1]) {
                newValue = parts[0] + "," + parts[1].slice(0, 3);
              }

              setWeightKg(newValue);
            }}
            keyboardType="numeric"
          />
        </View>

        <Text
          style={{
            fontSize: 32,
            paddingTop: 20,
            fontWeight: "bold",

            color: "#9E7245",
          }}
        >
          kg
        </Text>
      </View>

      <View style={{ marginTop: 16 }}>
        <TouchableOpacity
          onPress={handleAdd}
          style={{
            backgroundColor: "#3A2109",

            borderRadius: 9999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ padding: 16, color: "#FFF8F1", fontWeight: "bold" }}>
            Ajouter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: "#FCD6B0",
  },
  label: { fontSize: 16, marginTop: 16 },
});
