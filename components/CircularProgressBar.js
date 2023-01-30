import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { useTheme } from "react-native-paper";

const CircularProgressBar = ({subject, radius = 20, maxValue = 15, progressValueFontSize = 15, semester}) => {
  const [value, setValue] = useState(average);
  const theme = useTheme();
  const average = subject.semesters[semester - 1].average

  return (
    // <Text className="text-xl mr-5" style={{ fontFamily: "MontserratLight" }}>
    //   {subject.average}
    // </Text>
    !isNaN(average) ? (
      <View>
          <CircularProgress
              radius={radius}
              value={average}
              maxValue={maxValue}
              progressValueFontSize={progressValueFontSize}
              progressValueStyle={{fontFamily: "MontserratBold", fontWeight: "bold"}}
              inActiveStrokeColor={`rgba(0, 110, 0, 0.3)`}
              inActiveStrokeOpacity={1}
              inActiveStrokeWidth={5}
              activeStrokeColor={theme.colors.primary}
              activeStrokeWidth={5}
              duration={1000}
              
          />
      </View>
    ) : (
      <View>
        <Text>Keine Punkte</Text>
      </View>
    )
  );
};

export default CircularProgressBar;
