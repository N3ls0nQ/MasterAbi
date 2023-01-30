import { View, Text, Animated } from 'react-native'
import React from 'react'
import { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }) => {

    const containerRStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [-1,1],
            [0,1],
            Extrapolate.CLAMP
        )
    }))

  return <Animated.View style={[containerRStyle, {backgroundColor: "#000",}]} />;
}

export default CustomBackdrop