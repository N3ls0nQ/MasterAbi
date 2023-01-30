import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, IconButton, useTheme } from "react-native-paper";
import useData from "../hooks/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { subjectsDummyData } from "../data/subjects";
import slides from "../data/slides"
import OnboardingItem from "./Items/OnboardingItem";
import Animated, { useSharedValue } from "react-native-reanimated";
import Paginator from "./Paginator";

const Onboarding = () => {
  const { user, setUser, setSubjects } = useData();

  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();
  
  const scrollX = useRef(new Animated.Value(0)).current
  const slidesRef = useRef(null);
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if(currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({index: currentIndex + 1});
    } else {
      startSetup();
    }
  }

  const startSetup = async () => {
    try {
      //TODO: Nutzer gewählte Kurse auswählen lassen, ggb. Einführungs-Screen
      let jsonValue = JSON.stringify(subjectsDummyData);
      await AsyncStorage.setItem("user_subjects", jsonValue);
      const userSetup = {
        name: "Gast",
        showSemester: 1,
        average1: 10,
        average2: 12,
        average3: 7,
        average4: 14,
        state: "Berlin",
        doNotifications: true,
        notificationTime: new Date("2023-01-06T16:00:00.000Z"),
      };
      await AsyncStorage.setItem("user_general", JSON.stringify(userSetup));
      setUser(userSetup);
      setSubjects(subjectsDummyData);
    } catch (e) {
      alert(e);
    }
  };

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index)
  }).current

  return (
    <View className="flex-1 justify-center items-center">
      <View className="flex-[3]">
        <Animated.FlatList
          data={slides}
          renderItem={({item, index}) => {
            return(
              <OnboardingItem item={item}/>
            )
          }}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}  
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          scrollEventThrottle={32}
          ref={slidesRef}          
        />
        {/* <Button onPress={startSetup}>Login</Button> */}
      </View>

      <Paginator data={slides} scrollX={scrollX}/>

      <IconButton icon="arrow-right" size={40} className="mb-10 -mt-3" containerColor={"#f0f0f0"} onPress={scrollTo}/>
    </View>
  );
};

export default Onboarding;
