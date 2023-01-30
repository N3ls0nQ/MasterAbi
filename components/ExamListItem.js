import { View, Text } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { ThemeProvider, TouchableRipple, useTheme } from "react-native-paper";
import useData from "../hooks/UserContext";

const ExamListItem = ({ exam, index, onPress, subjectIndex}) => {
  const theme = useTheme();
  const {setSubjects, subjects, user} = useData();

  const deleteGrade = () => {
    const filter = subjects[subjectIndex].semesters[user.showSemester - 1].grades.filter((item) => item.id !== exam.id);
    setSubjects(filter);
  }

  return (
    <View className="bg-white rounded-lg mb-2">
      <TouchableRipple
        className="p-3 rounded-lg "
        borderless
        rippleColor="rgba(0, 0, 0, 0.1)"
        onPress={() => onPress(exam)}
        onLongPress={deleteGrade}
      >
        <View className="flex-row justify-between items-center">
          <Text
            className="text-lg"
            style={{ fontFamily: "MontserratMedium" }}
          >{`${exam.item.value} NP`}</Text>
          <Text
            className="text-sm"
            style={{
              fontFamily: "MontserratLight",
              color:
                exam.item.type === "schriftlich"
                  ? theme.colors.primary
                  : "black",
            }}
          >{`${exam.item.type}`}</Text>
          <Text
            className="text-sm"
            style={{ fontFamily: "MontserratLight" }}
          >{`${exam.item.date}`}</Text>
          <Feather
            name="edit"
            size={24}
            color="black"
            onPress={() => onPress(exam)}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

export default ExamListItem;
