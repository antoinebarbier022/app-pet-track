import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
}
export default function Button({ title, onPress }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={({ pressed: isPressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
      <View
        style={[styles.bottomBorder, pressed && styles.bottomBorderPressed]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#34A853", // couleur du bouton
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  buttonPressed: {
    width: "100%",
    transform: [{ translateY: 2 }],
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomBorder: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 4,
    width: "100%",
    backgroundColor: "#2c8e46", // couleur du "bord"
  },
  bottomBorderPressed: {
    height: 2, // effet enfoncé
  },
});
