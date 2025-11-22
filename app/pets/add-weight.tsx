import { useAddWeightToPet } from "@/features/pet/hooks/use-add-weight-to-pet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { DatePicker } from "@/components/ui/date-picker";

export default function AddWeight() {
  const router = useRouter();
  const [weightKg, setWeightKg] = useState("");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { petId, name } = useLocalSearchParams<{
    petId: string;
    name: string;
  }>();

  const addWeightToPet = useAddWeightToPet();

  const isDisabled = !(Number(weightKg) <= 100 && weightKg);

  const handleAdd = () => {
    if (!weightKg || !petId) {
      console.log("Missing weight or pet ID", { weightKg, petId });
      return;
    }
    addWeightToPet({
      petId: Number(petId),
      weight: {
        weightKg: Number(weightKg.replace(",", ".")),
        recordedAt: selectedDate,
      },
    });

    console.log({ weightKg, recordedAt: selectedDate });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // ajuster si tu as un header
    >
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
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

          <View style={{ flexDirection: "column", marginTop: 20, gap: 16 }}>
            <View
              style={{
                flexDirection: "row",
                gap: 4,
                width: "100%",
                alignItems: "center",

                backgroundColor: "#FDE2C8",
                outlineWidth: 2,
                outlineColor: "#9E7245",

                paddingVertical: 10,
                paddingHorizontal: 16,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: "bold",
                  color: "#9E7245",
                }}
              >
                kg
              </Text>

              <TextInput
                autoFocus={true}
                returnKeyType="done"
                placeholderTextColor="#D3A87C"
                cursorColor={"#684522ff"}
                selectionColor={"#684522ff"}
                style={{
                  fontSize: 32,
                  textAlign: "right",
                  paddingHorizontal: 10,
                  color: "#684522ff",
                  width: "100%",
                  flex: 1,

                  borderRadius: 8,
                  paddingVertical: 6,
                }}
                maxLength={6}
                defaultValue={weightKg}
                onChangeText={(value: string) => {
                  setWeightKg(value);
                  12;
                }}
                keyboardType="numeric"
              />
            </View>
            <View
              style={{
                backgroundColor: "#FDE2C8",
                outlineWidth: 2,
                outlineColor: "#9E7245",
                paddingVertical: 4,
                paddingHorizontal: 16,
                borderRadius: 20,
                gap: 0,
                maxHeight: 400,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    paddingVertical: 10,
                    fontWeight: "bold",
                    color: "#9E7245",
                  }}
                >
                  Date
                </Text>
                <DatePicker
                  initialDate={selectedDate}
                  onDateSelected={(date) => setSelectedDate(date)}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 16, opacity: isDisabled ? 0.3 : 1 }}>
          <TouchableOpacity
            disabled={isDisabled}
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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingVertical: 24,
    paddingHorizontal: 14,
    backgroundColor: "#FCD6B0",
  },
  label: { fontSize: 16, marginTop: 16 },
});
