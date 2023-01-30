import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Linking, Platform } from "react-native";
import useData from "./UserContext";

export const useNotifications = () => {

  const {user} = useData();

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("TOKEN", token);
    } else {
      //alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  async function schedulePushNotificationAsync(title, body, data, date) {

    if(!user.doNotifications) return;

    const userSettingsDate = new Date(user.notificationTime);
    date.setHours(userSettingsDate.getHours() + 1, userSettingsDate.getMinutes(), 0, 0)

    const notifyTime = date.getTime() / 1000;
    const current = new Date().setHours(new Date().getHours() + 1) / 1000;

    const trigger = notifyTime - current;

    console.info("Next Notification in", trigger, "Seconds.", "DATE:", date);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: {seconds: trigger},
    });
  }

  const handleNotification = notification => {
    
  };

  const handleNotificationResponse = response => {
    const data = response.notification.request.content.data;
    if(data?.url) Linking.openURL(data.url);

  };

  return {registerForPushNotificationsAsync, handleNotification, handleNotificationResponse, schedulePushNotificationAsync};
};
