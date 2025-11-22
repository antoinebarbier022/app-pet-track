import React, { PropsWithChildren } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
}
const Card = ({ children, style }: PropsWithChildren<Props>) => {
  return (
    <View
      style={[
        {
          borderRadius: 16,
          backgroundColor: "#fde2c897",
          borderWidth: 2,
          borderColor: "#EEC399",
          paddingHorizontal: 20,
          paddingVertical: 18,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const CardTitle = ({ children }: PropsWithChildren) => {
  return <Text style={{ color: "#3A2109", marginBottom: 4 }}>{children}</Text>;
};

Card.Title = CardTitle;
export { Card };
