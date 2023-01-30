import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import SubjectWrapper from "./SubjectWrapper";
import Settings from "../screens/Settings";
import {
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import useData from "../hooks/UserContext";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { subjectsDummyData } from "../data/subjects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding from "../components/Onboarding";
import HomeWrapper from "./HomeWrapper";
import TasksAndHomeworks from "../screens/TasksAndHomeworks";
import * as Notifications from "expo-notifications"
import { useNotifications } from "../hooks/useNotifications";

const BottomTapNavigator = createMaterialBottomTabNavigator();

const NavigationWrapper = () => {
  const { user } = useData();
  const {registerForPushNotificationsAsync, handleNotificationResponse} = useNotifications();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponse
    );
    return () => {
      if(responseListener)
        Notifications.removeNotificationSubscription(responseListener);
    }
  },[])

  return user?.name !== undefined ? (
    <NavigationContainer>
      <BottomTapNavigator.Navigator shifting>
        <BottomTapNavigator.Screen
          component={HomeWrapper}
          name="Home"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="ios-home" size={26} color={color} />
              ) : (
                <Ionicons name="ios-home-outline" size={26} color={color} />
              ),
          }}
        />
        <BottomTapNavigator.Screen
          component={SubjectWrapper}
          name="Subjects"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <FontAwesome5 name="book" size={26} color={color} />
              ) : (
                <Feather name="book" size={26} color={color} />
              ),
            title: "Meine Kurse",
          }}
        />
        <BottomTapNavigator.Screen
          component={TasksAndHomeworks}
          name="Homeworks"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="ios-list" size={26} color={color} />
                ) : (
                <Ionicons name="list-outline" size={26} color={color} />
              ),
            title: "Aufgaben",
          }}
        />
        <BottomTapNavigator.Screen
          component={Settings}
          name="Settings"
          options={{
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <Ionicons name="md-settings" size={26} color={color} />
              ) : (
                <Ionicons name="md-settings-outline" size={26} color={color} />
              ),
            title: "Einstellungen",
          }}
        />
      </BottomTapNavigator.Navigator>
    </NavigationContainer>
  ) : (
    <Onboarding />
  );
};

export default NavigationWrapper;
