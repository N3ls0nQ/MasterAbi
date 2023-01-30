import { View, Text } from "react-native";
import React from "react";
import Subjects from "../screens/Subjects";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer } from "@react-navigation/native";
import SubjectDetails from "../screens/SubjectDetails";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";

const SubjectWrapper = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent>
      <Stack.Navigator screenOptions={{presentation: "modal"}} initialRouteName="main">
        <Stack.Screen
          name="main"
          component={Subjects}
          options={{ headerShown: false}}
        />
        <Stack.Screen
          name="details"
          component={SubjectDetails}
          options={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS, gestureDirection: "horizontal"}}

          // sharedElements={(route, otherRoute, showing) => {
          //   const { subject, index } = route.params;
          //   return [
          //     {
          //       id: `${index}.${subject.name}.text`,
          //       animation: "fade",
          //     },
          //     {
          //       id: `item.bg`,
          //       animation: "fade",
          //       resize: "none",
          //       align: "left-top"
          //     },
          //   ];
          // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default SubjectWrapper;
