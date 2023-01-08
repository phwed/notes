import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { FONTS } from "./config/fonts";
import { NOTIFICATION } from "./config/notification";
import { useSettingsStore } from "./zustand/stores/settings";
import { createNotifications } from "react-native-notificated";
import Root from "./navigation/Root";
import {
  getStatusBarStyle,
  configureDesignSystem,
} from "./config/designSystem";
import { View } from "react-native-ui-lib";
import { ACTION_TYPES } from "./config/actionTypes";

const { NotificationsProvider, useNotifications, ...events } =
  createNotifications(NOTIFICATION);

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);
  const [ready, setReady] = React.useState(false);
  const actionType = useSettingsStore((state) => state.actionType);
  const resetActionType = useSettingsStore((state) => state.resetActionType);
  const appTheme = useSettingsStore((state) => state.appTheme);
  const { notify } = useNotifications();

  const start = React.useCallback(async () => {
    await SplashScreen.preventAutoHideAsync();

    configureDesignSystem(appTheme);
    resetActionType();
    setReady(true);

    await SplashScreen.hideAsync();
  }, [fontsLoaded, actionType]);

  React.useEffect(() => {
   start()
  }, [start]);

  if (!fontsLoaded) {
    return null;
  }



  return (
    <NotificationsProvider>
      <View flex onLayout={start}>
        <StatusBar style={getStatusBarStyle(appTheme)} />
        <Root />
      </View>
    </NotificationsProvider>
  );
}
