// dependecies
import React from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { FONTS } from "./config/fonts";
import { NOTIFICATION } from "./config/notification";
import { useSettingsStore } from "./zustand/stores/settings";
import { createNotifications } from "react-native-notificated";
import { View } from "react-native-ui-lib";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// navigation
import Root from "./navigation/Root";

// configurations
import {
  getStatusBarStyle,
  configureDesignSystem,
} from "./config/designSystem";

// providers
const { NotificationsProvider } = createNotifications(NOTIFICATION);

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  const actionType = useSettingsStore((state) => state.actionType);
  const resetActionType = useSettingsStore((state) => state.resetActionType);
  const appTheme = useSettingsStore((state) => state.appTheme);

  const start = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    configureDesignSystem(appTheme);
    resetActionType();

    await SplashScreen.hideAsync();
  }, [fontsLoaded, actionType]);

  React.useEffect(() => {
    start();
  }, [start]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <BottomSheetModalProvider>
      <NotificationsProvider>
        <View flex onLayout={start}>
          <StatusBar style={getStatusBarStyle(appTheme)} />
          <Root />
        </View>
      </NotificationsProvider>
    </BottomSheetModalProvider>
  );
}
