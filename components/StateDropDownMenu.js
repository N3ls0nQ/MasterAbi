import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { List, useTheme } from "react-native-paper";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import useData from "../hooks/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const states = [
  { label: "Baden-Württemberg", value: "1" },
  { label: "Bayern", value: "2" },
  { label: "Berlin", value: "3" },
  { label: "Brandenburg", value: "4" },
  { label: "Bremen", value: "5" },
  { label: "Hamburg", value: "6" },
  { label: "Hessen", value: "7" },
  { label: "Mecklenburg-Vorpommern", value: "8" },
  { label: "Niedersachsen", value: "9" },
  { label: "Nordrein-Westfalen", value: "10" },
  { label: "Rheinland-Pfalz", value: "11" },
  { label: "Saarland", value: "12" },
  { label: "Sachsen", value: "13" },
  { label: "Sachsen-Anhalt", value: "14" },
  { label: "Schleswig-Holstein", value: "15" },
  { label: "Thüringen", value: "16" },
];

const StateDropDownMenu = () => {
  const { user, setUser } = useData();
  const [value, setValue] = useState(user.state);

  const theme = useTheme();

  const updateUser = async () => {
    try {
      setUser({...user, state: value});
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    updateUser(value);
  }, [value]);

  return (
    <View>
      <Dropdown
        search
        data={states}
        value={value}
        searchPlaceholder={"Suche..."}
        labelField="label"
        valueField="value"
        placeholder="Bundesland"
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

export default StateDropDownMenu;

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