import { View, Text, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Appbar,
  Banner,
  Button,
  Dialog,
  Divider,
  HelperText,
  List,
  Paragraph,
  Portal,
  Snackbar,
  TextInput,
  useTheme,
} from "react-native-paper";
import { subjectsDummyData } from "../data/subjects";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useData from "../hooks/UserContext";
import StateDropDownMenu from "../components/StateDropDownMenu";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNotifications } from "../hooks/useNotifications";
import NotificationsComponent from "../components/NotificationsComponent";
import CustomDialog from "../components/CustomDialog";
import config from "../abimaster.config"
import * as Linking from 'expo-linking';

const Settings = () => {
  const { user, setUser, setSubjects, setTasks } = useData();
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [username, setUsername] = useState(user.name);
  const [usernameError, setUsernameError] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [doNotifications, setDoNotifications] = useState(user.doNotifications);
  const [time, setTime] = useState(new Date(user.notificationTime));
  const [easterEggClickCount, setEasterEggClickCount] = useState(0);


  const toggleDialog = () => {
    setVisible(!visible);
  };

  const onChange = useCallback(
    (event, selectedTime) => {
      setTimePickerVisible(false);
      setTime(selectedTime);
      setUnsavedChanges(true);
    },
    [setTimePickerVisible]
  );

  const handleEasteregg = () => {
    setEasterEggClickCount(easterEggClickCount + 1)
    console.log(easterEggClickCount);
    if(easterEggClickCount >= 4){
      Linking.openURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      setEasterEggClickCount(0)
    }
  }

  const resetApp = async () => {
    await AsyncStorage.removeItem("user_subjects");
    await AsyncStorage.removeItem("user_general");
    await AsyncStorage.removeItem("user_tasks");

    setSubjects([]);
    setUser(null);
    setTasks([])
  };

  const updateUser = () => {
    if (usernameError) return setBannerVisible(true);
    if (
      username === user.name &&
      time === user.notificationTime &&
      doNotifications === user.doNotifications
    )
      return;

    try {
      setUser({
        ...user,
        name: username,
        doNotifications: doNotifications,
        notificationTime: time,
      });
    } catch (e) {
      alert(e);
    }
    setUnsavedChanges(false);
    setSnackbarVisible(true);
  };

  useEffect(() => {
    if (doNotifications !== user.doNotifications || username !== user.name)
      setUnsavedChanges(true);
    else setUnsavedChanges(false);
    if (username === "") setUsernameError(true);
    else setUsernameError(false);
  }, [username, doNotifications]);

  return (
    <>
      <ScrollView className="flex-1">
        <Appbar.Header mode="small">
          <Appbar.Content title="Einstellungen" />
          <Appbar.Action
            icon={"check"}
            onPress={updateUser}
            color={unsavedChanges ? "white" : "black"}
            containerColor={
              unsavedChanges ? theme.colors.primary : "transparent"
            }
          />
        </Appbar.Header>

        <Banner
          visible={bannerVisible}
          actions={[
            {
              label: "OK",
              onPress: () => setBannerVisible(false),
            },
          ]}
        >
          <Text>Bitte gebe einen Nutzernamen an!</Text>
        </Banner>

        <View className="p-4">
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className="text-lg"
          >
            Nutzer
          </Text>
          <View className="m-2">
            <Text style={{ fontFamily: "MontserratRegular", marginBottom: 12 }}>
              Name
            </Text>
            <TextInput
              placeholder="Name"
              mode="outlined"
              value={username}
              onChangeText={setUsername}
              error={usernameError}
              dense
              className="-mt-2"
              right={
                username !== "" ? (
                  <TextInput.Icon
                    icon="check"
                    iconColor={theme.colors.primary}
                    forceTextInputFocus
                  />
                ) : (
                  <TextInput.Icon icon="close" iconColor={theme.colors.error} />
                )
              }
            />
            <HelperText
              type="error"
              padding="normal"
              visible={usernameError}
              style={{ marginTop: usernameError ? 10 : -28 }}
            >
              Dieses Feld darf nicht leer sein!
            </HelperText>
            <Divider className="my-3" />
            <Text style={{ fontFamily: "MontserratRegular", marginBottom: 12 }}>
              Bundesland
            </Text>
            <StateDropDownMenu />
            <Divider className="mt-3" />
          </View>

          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className="text-lg"
          >
            Allgemein
          </Text>
          <View className="m-2"></View>

          <View className="flex gap-y-3 p-4 -mt-6 justify-between">
            <NotificationsComponent
              doNotifications={doNotifications}
              visible={timePickerVisible}
              setVisible={setTimePickerVisible}
              time={time}
              setTime={setTime}
              setDoNotifications={setDoNotifications}
              onChange={onChange}
            />
            <Button
              mode="outlined"
              icon={"close"}
              textColor={theme.colors.error}
              style={{ borderColor: theme.colors.error }}
              loading={visible}
              onPress={toggleDialog}
            >
              App zurücksetzen
            </Button>
            <Divider className="w-full" bold />
            <Text
              style={{ fontFamily: "MontserratLight" }}
              className="text-center"
              onPress={handleEasteregg}
            >
              {config.version}
            </Text>
          </View>
          <CustomDialog
            title={"Achtung!"}
            paragraph="Bist du sicher das du die App zurücksetzen willst? Dabei gehen
            alle deine Daten verloren."
            cancelButtonAction={toggleDialog}
            yesButtonAction={resetApp}
            visible={visible}
            dismissable={false}
          />
        </View>
      </ScrollView>
      <Snackbar
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => setSnackbarVisible(false)}
      >
        Gespeichert!
      </Snackbar>
    </>
  );
};

export default Settings;
