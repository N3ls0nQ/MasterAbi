import { View, Text } from "react-native";
import React from "react";
import { ProgressBar, TouchableRipple, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Abiturschnitt = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    // <View className="flex" style={{backgroundColor: theme.colors.secondaryContainer}}>
    <View>
      <TouchableRipple
        borderless
        className="flex rounded-lg p-2 flex-row justify-between items-center"
        style={{ backgroundColor: "white" }}
        onPress={() => navigation.navigate("abischnittDetails")}
      >
        <>
          <View>
            <Text className="text-lg" style={{ fontFamily: "MontserratRegular" }}>
              Abiturschnitt
            </Text>
          </View>
          <View>
            <View>
              <Text
                className="text-base"
                style={{ fontFamily: "MontserratRegular" }}
              >
                Block I
              </Text>
              <ProgressBar progress={0} />
            </View>
            <View>
              <Text
                className="text-base"
                style={{ fontFamily: "MontserratRegular" }}
              >
                Block II
              </Text>
              <ProgressBar progress={0} />
            </View>
          </View>
        </>
      </TouchableRipple>
    </View>
  );
};

export default Abiturschnitt;