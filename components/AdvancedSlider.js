import { View, Text, useWindowDimensions, Dimensions } from "react-native";
import React, { useCallback } from "react";
import Label from "./Slider/Label";
import Rail from "./Slider/Rail";
import RailSelected from "./Slider/RailSelected";
import Thumb from "./Slider/Thumb";
import Notch from "./Slider/Notch";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import Slider from "@react-native-community/slider";
import { useTheme } from "react-native-paper";

const AdvancedSlider = ({
  value,
  setValue,
  suffix = "",
  animateTransitions,
  step,
  maxValue,
  minValue,
}) => {

    const theme = useTheme();
    const {width} = Dimensions.get("window");

  return (
    <View className="flex flex-row gap-4 justify-between items-center">
      <View>
        <MultiSlider
            max={maxValue}
            min={minValue}
            values={[value]}
            valueSuffix={suffix}
            isMarkersSeparated
            markerOffsetY={1}
            containerStyle={{height: 30}}
            markerStyle={{backgroundColor: theme.colors.primary, width: 16, height: 16}}
            enableLabel
            //customLabel={(e) => {return (<Label e={e}/>)}}
            sliderLength={width * 0.9}
            onValuesChange={(val) => setValue(val[0])}
            customMarker={(e) => {
                return (
                    <Text>{e.valueSuffix}</Text>
                )
            }}
        />
        {/* <Slider
          ref={ref}
        style={{width: 250, height: 40}}
          tapToSeek
          thumbTintColor={theme.colors.primary}
          minimumTrackTintColor={theme.colors.primary}
          maximumValue={maxValue}
          minimumValue={minValue}
          step={1}
          value={value}
          onValueChanged={value => setValue(parseInt(value * 100))}
          
        /> */}
      </View>
    </View>
  );
};
export default AdvancedSlider;
