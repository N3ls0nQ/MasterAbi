import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import ExamTable from "../components/ExamTable";
import { IconButton, Snackbar } from "react-native-paper";

const SubjectDetails = ({ navigation, route }) => {
  const { subject, index } = route.params;
  

  return (
    <View className="flex-1">
      <View className="flex-1 p-12 px-4">
        <View className="flex flex-row items-center justify-between">
          {/* <IconButton icon={"arrow-left"} size={30} color="black" onPress={() => navigation.goBack()}/> */}
          <AntDesign name="arrowleft" size={28} color="black" style={{zIndex: 12}} onPress={() => navigation.goBack()}/>
          <View
            id={`${index}.${subject.name}.text`}
            style={{ zIndex: 2 }}
          >
            <Text
              className="text-2xl"
              style={{ fontFamily: "MontserratBold", zIndex: 2 }}
            >
              {subject.name}
            </Text>
          </View>
          {/* <IconButton icon={"file-settings-outline"} size={30} color="black" onPress={() => navigation.goBack()}/> */}
          <Ionicons name="md-settings-outline" size={26} color="black" />
        </View>

        <ExamTable subject={subject} setSnackbarVisible={() => setSnackbarVisible(true)}/>
      </View>
    </View>
  );
};

export default SubjectDetails;
