import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AdvancedSlider from '../components/AdvancedSlider'

const AbischnittDetails = () => {

  const [value, setValue] = useState(0);

  return (
    <View>
      <Text>AbischnittDetails</Text>
      <AdvancedSlider
        maxValue={100}
        minValue={1}
        step={1}
        animateTransitions
        setValue={setValue}
        value={value}
      />
    </View>
  )
}

export default AbischnittDetails