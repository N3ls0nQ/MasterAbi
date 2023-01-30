import { View, Text, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MainChart from "./MainChart";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useData from "../hooks/UserContext";
import { getOverallAveragePoints } from "../helper/getOverallAveragePoints";
import {getSemesterAveragePoints} from "../helper/getSemesterAveragePoints"
import { BarChart } from "react-native-chart-kit";
import { useTheme } from "react-native-paper";

const PointsAverageChart = ({ yAxisSuffix, data, labels }) => {

  const {subjects} = useData();
  const { width, height } = Dimensions.get("window");
  const theme = useTheme();

  useEffect(() => {
      let x = getSemesterAveragePoints(subjects)
    }, []);

  return (
    <View className="flex flex-1">
      <MainChart yAxisSuffix={yAxisSuffix} data={data} labels={labels} />
      {/* <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: data,
            },
          ],
        }}
        width={width}
        height={height * 0.3}
        chartConfig={{
          backgroundColor: theme.colors.secondaryContainer,
          backgroundGradientFrom: theme.colors.secondaryContainer,
          backgroundGradientTo: theme.colors.secondaryContainer,
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => theme.colors.onTertiaryContainer,
          labelColor: (opacity = 1) => "#000",
          barPercentage: 1,
          style: {
            borderRadius: 16,
          },
        }}
        fromZero
        segments={5}
        
        style={{
          borderRadius: 16,
        }}
      /> */}
    </View>
  );
};

export default PointsAverageChart;
