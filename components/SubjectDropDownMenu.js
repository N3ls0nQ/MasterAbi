import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import useData from "../hooks/UserContext";
import { Dropdown } from "react-native-element-dropdown";
import { useTheme } from "react-native-paper";

const SubjectDropDownMenu = ({value, setValue, data}) => {

  const theme = useTheme();

  return (
    <View className="mt-4">
      <Dropdown
        search
        data={data}
        value={value}
        searchPlaceholder={"Suche..."}
        labelField="label"
        valueField="value"
        placeholder="Kurs"
        onChange={(item) => {
          setValue(item.value);
        }}
        maxHeight={300}
        style={[styles.dropdown, {backgroundColor: theme.colors.background, borderColor: theme.colors.outline}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
      />
    </View>
  );
};

export default SubjectDropDownMenu;

const styles = StyleSheet.create({
    dropdown: {
      margin: 0,
      height: 50,
      borderRadius: 5,
      padding: 12,
      borderWidth: 1
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });