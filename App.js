import {
  Provider as PaperProvider, useTheme,
} from "react-native-paper";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect } from "react";
import { subjectsDummyData as subjects } from "./data/subjects";
import { useFonts } from "expo-font";
import NavigationWrapper from "./navigation/NavigationWrapper";
import UserContext, { UserProvider } from "./hooks/UserContext";
import * as SplashScreen from "expo-splash-screen";
import green from "./theme/green"
import darkGreen from "./theme/darkGreen"

export default function App() {

  const [loaded, error] = useFonts({
    MontserratLight: require("./assets/fonts/Montserrat-Light.ttf"),
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./assets/fonts/Montserrat-Medium.ttf"),
    MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if(!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={green}>
        <BottomSheetModalProvider>
          <UserProvider>
            <NavigationWrapper/>
          </UserProvider>
        </BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
