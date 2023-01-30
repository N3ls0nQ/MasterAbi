import { View, Text } from "react-native";
import React from "react";
import Subjects from "../screens/Subjects";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import Home from "../screens/Home";
import AbischnittDetails from "../screens/AbischnittDetails";

const HomeWrapper = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{presentation: "modal"}} initialRouteName="home">
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="abischnittDetails"
          component={AbischnittDetails}
          options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, gestureDirection: "horizontal"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeWrapper;
