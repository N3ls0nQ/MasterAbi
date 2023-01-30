import { View, Text, Dimensions } from "react-native";
import React from "react";
import { PanGestureHandler } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import Animated, {
  clockRunning,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";

const LIST_ITEM_HEIGHT = 70;

const TaskListItem = ({ item, onDismiss, simultaneousHandler }) => {
  const theme = useTheme();
  const { width: SCREEN_WIDTH } = Dimensions.get("window");
  const TRANSLATE_X_TRESHHOLD = -SCREEN_WIDTH * 0.3;

  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(LIST_ITEM_HEIGHT);
  const marginTop = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
    },
    onEnd: (event) => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_TRESHHOLD;
      if (shouldBeDismissed) {
        // translateX.value = withTiming(-SCREEN_WIDTH);
        // //itemHeight.value = withTiming(0);
        // marginTop.value = withTiming(0);
        // opacity.value = withTiming(0, undefined, (isFinished) => {
        //   if(isFinished && onDismiss)
        //   runOnJS(onDismiss)(item)
        //   console.log("REMOVED:", item)
        //   console.log(itemHeight.value)
        // });
        runOnJS(onDismiss)(item);
        console.log("REMOVED:", item);
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedIconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(
      translateX.value < TRANSLATE_X_TRESHHOLD ? 1 : 0
    );
    return { opacity };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    height: LIST_ITEM_HEIGHT,
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    marginTop: marginTop.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[animatedContainerStyle]}>
      <Animated.View
        className="right-[3%] absolute justify-center items-center"
        style={[
          { height: LIST_ITEM_HEIGHT, width: LIST_ITEM_HEIGHT },
          animatedIconContainerStyle,
        ]}
      >
        <FontAwesome5
          name="trash-alt"
          size={LIST_ITEM_HEIGHT * 0.4}
          color={theme.colors.error}
        />
      </Animated.View>
      <PanGestureHandler
        onGestureEvent={panGesture}
        simultaneousHandlers={simultaneousHandler}
        failOffsetY={[-5, 5]} activeOffsetX={[-5, 5]}
      >
        <Animated.View
          className="flex-row items-center justify-between mx-2 rounded-lg bg-white p-2"
          style={[animatedStyle]}
        >
          <Text
            className="text-lg"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            {item.taskSubject}
          </Text>
          <Text style={{ fontFamily: "MontserratRegular" }}>
            {item.taskName}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default TaskListItem;
