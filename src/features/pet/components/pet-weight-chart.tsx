import React, { useMemo } from "react";
import { Dimensions, View } from "react-native";

import { CurveType, LineChart } from "react-native-gifted-charts";
import { PetWithWeights } from "../types";

export type Point = {
  value: number;
  date: Date;
  hideDataPoint?: boolean;
};

interface Props {
  data: PetWithWeights;
  onPointPress?: (data: Point | null) => void;
  onPointLeave?: () => void;
  onPointEnter?: () => void;
}
export const PetWeightChart = ({
  data,
  onPointPress,
  onPointLeave,
  onPointEnter,
}: Props) => {
  const { width } = Dimensions.get("window");

  const chartData = useMemo(() => {
    return data.weights.map((w, idx) => {
      return {
        value: Number(w.weightKg),
        date: new Date(w.recordedAt),
        hideDataPoint: data.weights.length !== 1,
      } as Point;
    });
  }, [data.weights]);

  const chartWidth = width * 0.8;

  return (
    <View
      style={{
        paddingTop: 20,
        backgroundColor: "transparent",
      }}
    >
      <LineChart
        curved
        curveType={CurveType.QUADRATIC}
        thickness={3}
        color="#E97E20"
        maxValue={Math.max(...data.weights.map((w) => Number(w.weightKg))) + 1}
        noOfSections={3}
        // animation
        isAnimated
        //animateOnDataChange there is a bug on the second insertion
        animationDuration={1000}
        pointerConfig={{
          radius: 4,

          onResponderEnd: onPointLeave,
          onResponderGrant: onPointEnter,

          pointerComponent: () => (
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: "#e15108",
                outlineWidth: 5,
                outlineColor: "#e97e205f",
                transform: [{ translateX: 0 }, { translateY: 1 }],
                borderColor: "white",
              }}
            />
          ),

          pointerStripColor: "transparent",
          pointerColor: "#3A2109",
          persistPointer: false,

          //   pointerLabelComponent: (items: Point[]) => {
          //     onPointPress?.({ value: items[0].value, date: items[0].date });
          //     return (
          //       <View
          //         style={{
          //           height: 40,
          //           width: 60,
          //           backgroundColor: "#282C3E",
          //           borderRadius: 4,
          //           justifyContent: "center",
          //           paddingLeft: 16,
          //           transform: [{ translateY: -15 }],
          //         }}
          //       >
          //         <Text style={{ color: "lightgray", fontSize: 12 }}>kg</Text>
          //         <Text style={{ color: "white", fontWeight: "bold" }}>
          //           {items[0].value}
          //         </Text>
          //       </View>
          //     );
          //   },
        }}
        data={chartData}
        // Area
        areaChart
        startFillColor={"rgba(255, 153, 63, 1)"}
        endFillColor={"rgba(255, 153, 63, 1)"}
        startOpacity={0.6}
        endOpacity={0.05}
        initialSpacing={data.weights.length > 1 ? 0 : chartWidth / 2}
        spacing={
          data.weights.length > 1
            ? chartWidth / (data.weights.length - 1)
            : chartWidth
        }
        backgroundColor="transparent"
        rulesColor="#edc093"
        rulesType="dashed"
        xAxisColor="#F2C79D"
        width={chartWidth}
        showVerticalLines
        verticalLinesColor="#F2C79D"
        verticalLinesThickness={1}
        yAxisLabelSuffix="kg"
        yAxisTextStyle={{ color: "#936941" }}
        yAxisLabelWidth={40}
        yAxisThickness={0}
      />
    </View>
  );
};
