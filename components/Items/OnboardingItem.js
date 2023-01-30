import { View, Text, useWindowDimensions, Image, Dimensions } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated';

const OnboardingItem = ({item}) => {

  const {width} = Dimensions.get("window")

  return (
    <View style={{width: width, flex: 1}}>
      <Image source={item.image} style={{width, resizeMode: "contain", flex: 0.7}} className="justify-center"/>
      <View style={{flex: 0.3}}>
        <Text style={{fontFamily: "MontserratBold"}} className="text-center text-[28px] mb-[10px]">{item.title}</Text>
        <Text style={{fontFamily: "MontserratMedium"}} className="text-center text-base px-[64px] mb-[10px]">{item.description}</Text>
      </View>
    </View>
  )
}

export default OnboardingItem