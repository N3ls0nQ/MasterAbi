import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableRipple, useTheme } from "react-native-paper";
import Animated, { runOnJS } from "react-native-reanimated";
import useData from "../../hooks/UserContext";

const formatDate = (inputDate) => {
  var date = inputDate.getDate();
  var month = inputDate.getMonth() + 1;
  var year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");

  return `${date}.${month}.${year}`;
};

const TaskItem = ({ item, simultaneousHandler }) => {
  const theme = useTheme();
  const LIST_ITEM_HEIGHT = 70;
  const {tasks, setTasks} = useData();

  
  const onDismiss = useCallback(() => {
    console.log("REMOVED:", item)
    setTasks((tasks) => tasks.filter((taskInArr) => taskInArr.taskDescription !== item.taskDescription))
  },[])

  const leftSwipe = (progress, dragX) => {
    return (
      <TouchableRipple onPress={onDismiss} className="ml-2">
        <Animated.View
          className="justify-center items-center rounded-lg"
          style={[{ height: LIST_ITEM_HEIGHT, width: LIST_ITEM_HEIGHT }]}
        >
          <FontAwesome5
            name="trash-alt"
            size={LIST_ITEM_HEIGHT * 0.4}
            color={theme.colors.error}
          />
        </Animated.View>
      </TouchableRipple>
    );
  };


  return (
    <View className="flex-1 mx-2 mt-2">
      <TouchableRipple onPress={() => {}} borderless className="rounded-lg">
        <Swipeable renderRightActions={leftSwipe}>
          <View
            className="flex-row items-center justify-between rounded-lg bg-white p-2"
            style={[{ height: LIST_ITEM_HEIGHT }]}
          >
            <View>
              <Text
                className="text-lg"
                style={{ fontFamily: "MontserratSemiBold" }}
              >
                {item.taskSubject}
              </Text>
              <Text>{`Bis ${formatDate(new Date(item.date))}`}</Text>
            </View>
            <Text style={{ fontFamily: "MontserratSemiBold" }}>
              {item.taskDescription}
            </Text>
          </View>
        </Swipeable>

      </TouchableRipple>
    </View>
  );
};

export default TaskItem;
