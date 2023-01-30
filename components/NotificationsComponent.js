import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Divider, Switch } from "react-native-paper";
import { useNotifications } from "../hooks/useNotifications";
import DateTimePicker from "@react-native-community/datetimepicker";
import useData from "../hooks/UserContext";

const NotificationsComponent = ({visible, doNotifications, time, onChange, setDoNotifications, setVisible}) => {
  const { schedulePushNotificationAsync } = useNotifications();

  return (
    <View className="flex-1 justify-between">
      <Text style={{ fontFamily: "MontserratRegular" }}>
        Benachrichtigungen
      </Text>
      <View className="flex-row justify-between items-center">
        <Text>Benachrichtigungen einschalten</Text>
        <Switch value={doNotifications} onValueChange={setDoNotifications} />
      </View>
      <View className="flex-row justify-between items-center mb-3 -mt-2">
        <Button
          mode="text"
          onPress={() => {
            setVisible(true);
          }}
        >
          Zeit für Benachrichtigungen
        </Button>
        {visible && (
          <DateTimePicker
            timeZoneOffsetInSeconds={3600}
            mode="time"
            is24Hour
            value={new Date(time)}
            onChange={onChange}
            display="clock"
          />
        )}
        <Text
          style={{ fontFamily: "MontserratSemiBold", }}
          className="text-base"
        >
          {time.toLocaleTimeString("de-DE").slice(0, time.toLocaleTimeString("de-DE").length - 3) + " Uhr"}
        </Text>
      </View>
      <Button
        mode="outlined"
        icon={"bell"}
        onPress={() =>
          schedulePushNotificationAsync(
            "This is a title",
            "This is the message",
            { boy: "boy" },
            new Date()
          )
        }
      >
        Push Notification Test
      </Button>
      <Divider bold className="mt-3" />
    </View>
  );
};

export default NotificationsComponent;
