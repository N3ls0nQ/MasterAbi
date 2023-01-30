import { View, Text, Dimensions } from "react-native";
import React, { useEffect } from "react";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
import { useTheme } from "react-native-paper";

const MainChart = ({labels, data, yAxisSuffix}) => {

  const theme = useTheme();

  return (
    <LineChart
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
          },
        ],
      }}
      width={width}
      height={220}
      fromZero
      
      yAxisSuffix={yAxisSuffix}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: theme.colors.secondaryContainer,
        backgroundGradientFrom: theme.colors.secondaryContainer,
        backgroundGradientTo: theme.colors.secondaryContainer,
        decimalPlaces: 1, // optional, defaults to 2dp
        color: (opacity = 1) => theme.colors.onTertiaryContainer,
        labelColor: (opacity = 1) => theme.colors.onTertiaryContainer,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "3",
          stroke: theme.colors.primary,
        },
      }}
      bezier
      style={{
        margin: 15,
        borderRadius: 16,
        elevation: 6,
        shadowColor: "black",
        shadowOffset: {height: 5, width: 5}
      }}
    />
  );
};

export default MainChart;
