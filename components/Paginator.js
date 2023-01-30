import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import Animated from "react-native-reanimated";

const Paginator = ({ data, scrollX }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row h-[64px]">
      {data.map((item, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1 , 0.3],
            extrapolate: "clamp",
        })

        return (
          <Animated.View
            style={[
              styles.dot,
              { backgroundColor: theme.colors.secondaryContainer, width: dotWidth, opacity: opacity},
            ]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

export default Paginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});
