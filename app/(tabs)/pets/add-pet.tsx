import { useAddPet } from "@/features/pet/hooks/use-add-pet";
import { Pet } from "@/features/pet/types";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddPet() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [type, setType] = useState<Pet["type"]>("cat");
  const [birthDate, setBirthDate] = useState(new Date());

  const addPet = useAddPet();

  const handleAdd = () => {
    addPet({ name, type, birthDate });

    console.log({ name, type, birthDate });
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom de l'animal</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Date de naissance</Text>
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
