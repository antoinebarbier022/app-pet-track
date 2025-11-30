import roboto from "@/assets/fonts/Roboto/roboto.ttf";
import {
  Circle,
  DashPathEffect,
  LinearGradient,
  Path,
  Text,
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

export type Point = {
  day: number;
  weight: number;
};

interface Props {
  weightGoal?: number;
  data: Point[];
  chartPress: ReturnType<
    typeof useChartPressState<{
      x: number;
      y: {
        weight: number;
      };
    }>
  >;
}

export const WeightChart = ({ weightGoal, data, chartPress }: Props) => {
  const { state, isActive } = chartPress;

  const { width } = Dimensions.get("window");

  const maxWeight = useMemo(() => {
    return Math.max(...data.map((p) => p.weight));
  }, [data]);
  const yAxisfont = useFont(roboto, 12);

  const goalAxisfont = useFont(roboto, 10);

  const curveType = "monotoneX";

  return (
    <View
      style={{
        height: 220,
        width: width,
      }}
    >
      <CartesianChart
        data={data}
        xKey="day"
        yKeys={["weight"]}
        domainPadding={{ top: 20, left: 12, right: 12, bottom: 0 }}
        chartPressState={state}
        viewport={{ y: [0, maxWeight + 1] }}
        padding={{ left: 20, right: 20, bottom: 0 }}
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
        {({ points, chartBounds }) => {
          const minY = 0;
          const maxY = maxWeight + 1; // même valeur que ton viewport.y

          const targetY =
            chartBounds.bottom -
            ((weightGoal ?? 0 - minY) / (maxY - minY)) *
              (chartBounds.bottom - chartBounds.top);

          const pathD = `M ${chartBounds.left + 12} ${targetY} L ${
            chartBounds.right - 12
          } ${targetY}`;
          return (
            <>
              <Text
                x={chartBounds.right - 60} // position X
                y={targetY - 6} // légèrement au-dessus
                color="#3A2109"
                font={goalAxisfont} // même font que ton axe
                text={"Objectif"}
              ></Text>
              <Path
                color={"#3a2109ff"}
                path={pathD}
                strokeWidth={1}
                style="stroke"
              >
                <DashPathEffect intervals={[10, 5]} />
              </Path>

              <Area
                points={points.weight}
                curveType={curveType}
                y0={chartBounds.bottom}
                animate={{
                  type: "timing",
                  duration: 0,
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
                  duration: 0,
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
                      duration: 0,
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
                      duration: 0,
                    }}
                  />
                </>
              )}

              {isActive ? (
                <ToolTip x={state.x.position} y={state.y.weight.position} />
              ) : null}
            </>
          );
        }}
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
