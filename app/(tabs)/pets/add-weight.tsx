import { useAddWeightToPet } from "@/features/pet/hooks/use-add-weight-to-pet";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddPet() {
  const router = useRouter();
  const [weightKg, setWeightKg] = useState("");
  const [recordedAt, setRecordedAt] = useState(new Date());
  const { petId } = useLocalSearchParams<{ petId: string }>();

  const addWeightToPet = useAddWeightToPet();

  const handleAdd = () => {
    if (!weightKg || !petId) {
      console.log("Missing weight or pet ID", { weightKg, petId });
      return;
    }
    addWeightToPet({
      petId: Number(petId),
      weight: { weightKg: Number(weightKg), recordedAt },
    });

    console.log({ weightKg, recordedAt });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Combien pèse votre animal ?</Text>
      <TextInput
        style={styles.input}
        value={weightKg}
        onChangeText={(text) => {
          const formatted = text.replace(",", ".");
          if (/^\d*\.?\d*$/.test(formatted)) setWeightKg(formatted);
        }}
        keyboardType="numeric"
      />
      <View style={{ marginTop: 16 }}>
        <Button title="Ajouter" onPress={handleAdd} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", padding: 16 },
  label: { fontSize: 16, marginTop: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
});
