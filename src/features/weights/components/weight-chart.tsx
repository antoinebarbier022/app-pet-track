import roboto from "@/assets/fonts/Roboto/roboto.ttf";
import {
  Circle,
  LinearGradient,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import { useMemo } from "react";
import { Dimensions, View } from "react-native";
import { type SharedValue } from "react-native-reanimated";
import {
  Area,
  CartesianChart,
  Line,
  Scatter,
  useChartPressState,
} from "victory-native";
import { PetWithWeights } from "../../pets/types";

type Point = {
  day: number;
  weight: number;
  date: Date;
};

interface Props {
  data: PetWithWeights;
  chartPress: ReturnType<
    typeof useChartPressState<{
      x: number;
      y: {
        weight: number;
      };
    }>
  >;
}

export const WeightChart = ({ data, chartPress }: Props) => {
  const { state, isActive } = chartPress;

  const { width } = Dimensions.get("window");
  const chartData = useMemo(() => {
    return data.weights.map((w, idx) => {
      return {
        day: idx + 1,
        weight: Number(w.weightKg),
        date: new Date(w.recordedAt),
      } as Point;
    });
  }, [data.weights]);

  const maxWeight = useMemo(() => {
    return Math.max(...chartData.map((p) => p.weight));
  }, [chartData]);

  const yAxisfont = useFont(roboto, 12);

  const curveType = "monotoneX";

  return (
    <View style={{ height: 280, width: width, marginLeft: "auto" }}>
      <CartesianChart
        data={chartData}
        xKey="day"
        yKeys={["weight"]}
        domainPadding={{ top: 0, left: 12, right: 12, bottom: 12 }}
        chartPressState={state}
        viewport={{ y: [0, maxWeight + 1] }}
        padding={{ left: 20, right: 20, bottom: 10 }}
        yAxis={[
          {
            font: yAxisfont,
            formatYLabel: (label) => label.toFixed(1) + " kg",
            lineColor: "#daad807b",
            lineWidth: 0.5,
            labelPosition: "outset",

            axisSide: "left",
            tickCount: 6,

            domain: [0, maxWeight],
            labelColor: "#936941",
            labelOffset: 0,
          },
        ]}
        xAxis={{
          lineColor: undefined,
          lineWidth: 0,
        }}
      >
        {/* 👇 render function exposes various data, such as points. */}
        {({ points, chartBounds }) => (
          <>
            <Area
              points={points.weight}
              curveType={curveType}
              y0={chartBounds.bottom}
              animate={{
                type: "timing",
                duration: 500,
              }}
            >
              <LinearGradient
                start={vec(chartBounds.bottom, chartBounds.top)}
                end={vec(chartBounds.bottom, chartBounds.bottom)}
                colors={["rgba(255, 153, 63, 0.6)", "rgba(255, 153, 63, 0)"]}
              />
            </Area>
            <Line
              points={points.weight}
              color="#E97E20"
              curveType={curveType}
              strokeWidth={3}
              animate={{
                type: "timing",
                duration: 500,
              }}
            />
            {points.weight.length <= 10 && (
              <>
                <Scatter
                  points={points.weight}
                  shape="circle"
                  radius={3}
                  style="stroke"
                  strokeWidth={4}
                  color="#E97E20"
                  opacity={1}
                  animate={{
                    type: "timing",
                    duration: 500,
                  }}
                />
                <Scatter
                  points={points.weight}
                  shape="circle"
                  radius={3}
                  style="fill"
                  strokeWidth={2}
                  opacity={1}
                  color="#FCD6B0"
                  animate={{
                    type: "timing",
                    duration: 500,
                  }}
                />
              </>
            )}

            {isActive ? (
              <ToolTip x={state.x.position} y={state.y.weight.position} />
            ) : null}
          </>
        )}
      </CartesianChart>
    </View>
  );
};

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return (
    <>
      <Circle cx={x} cy={y} r={4} color="#e15108" />
      <Circle cx={x} cy={y} r={10} color="#e97e205f" />
    </>
  );
}
