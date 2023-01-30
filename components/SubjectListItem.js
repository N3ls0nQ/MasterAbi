import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Button,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { IconButton, List, TouchableRipple, useTheme, withTheme } from "react-native-paper";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CircularProgressBar from "./CircularProgressBar";
import useData from "../hooks/UserContext";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import CustomDialog from "./CustomDialog";

const SubjectListItem = ({ subject, index, semester = 1}) => {
  const { width, height } = Dimensions.get("window");
  const MAX_TRANSLATION = -width * 0.3;
  const ITEM_HEIGHT = height * 0.1;

  const navigation = useNavigation();
  const theme = useTheme();
  const { setSubjects, subjects } = useData();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [toggle, setToggle] = useState(false);

  const translateX = useSharedValue(0);
  const containerTranslationX = useSharedValue(0);
  const itemHeight = useSharedValue(ITEM_HEIGHT);
  const opacity = useSharedValue(0);

  const handleLongPress = () => {
    setToggle(!toggle);
  };
  
  useEffect(() => {
    if(toggle)
      translateX.value = withTiming(MAX_TRANSLATION);
    else translateX.value = withTiming(0)
  },[toggle])

  const deleteSubject = () => {
    setDialogVisible(false);
    translateX.value = withTiming(0);
    containerTranslationX.value = withTiming(-width - 100)
    const filter = subjects.filter((item) => item.name !== subject.name);
    setSubjects(filter);
  };

  const handleCancelButton = () => {
    setDialogVisible(false)
    setToggle(false)
  }

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rContainer = useAnimatedStyle(() => ({
    height: itemHeight.value,
    transform: [{translateX: containerTranslationX.value}]
  }));

  const rAction = useAnimatedStyle(() => ({
    opacity: opacity.value
  }));

  return (
    <Animated.View style={[rContainer]} className="rounded-lg p-2 my-1 mx-2 justify-center">
      <View className="right-[3%] absolute flex flex-row rounded-lg" style={rAction}>
        <IconButton icon={"arrow-right"} iconColor={theme.colors.onBackground} size={30} onPress={() => setToggle(false)}/>
        <IconButton icon={"delete"} iconColor={theme.colors.error} size={30} onPress={() => setDialogVisible(true)}/>
      </View>
      <Animated.View style={[rStyle]} className="bg-white rounded-lg">
        <TouchableRipple
          borderless
          activeOpacity={1}
          onLongPress={handleLongPress}
          onPress={() => {
            navigation.push("details", { subject, index });
          }}
          className="rounded-lg p-3"
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className="text-lg"
                style={{ fontFamily: "MontserratSemiBold" }}
              >
                {subject.name}
              </Text>
              <Text
                style={{
                  fontFamily: "MontserratRegular",
                  color:
                    subject.type === "Leistungskurs"
                      ? theme.colors.primary
                      : "black",
                }}
              >
                {subject.type}
              </Text>
            </View>
            <View className="self-center">
              <CircularProgressBar subject={subject} semester={semester} />
            </View>
          </View>
        </TouchableRipple>
      </Animated.View>
      <CustomDialog
        title={"Achtung!"}
        paragraph="Durch löschen des Kurses, löschst du auch alle Daten dafür!"
        visible={dialogVisible}
        cancelButtonAction={handleCancelButton}
        yesButtonAction={deleteSubject}
        dismissable={false}
      />
    </Animated.View>
  );
};

export default SubjectListItem;
