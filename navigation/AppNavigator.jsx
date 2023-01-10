import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "../config/routes";

// pages
import Home from "../screens/Home";
import TextNotes from "../screens/TextNotes";
import ImageNotes from "../screens/ImageNotes";
import Doodles from "../screens/Doodles";
import Checklist from "../screens/Checklist";

// zustand
import { useSettingsStore } from "../zustand/stores/settings";
import { getNavigationTheme } from "../config/designSystem";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const appTheme = useSettingsStore((state) => state.appTheme);

  return (
    <NavigationContainer theme={getNavigationTheme(appTheme)}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen name={ROUTES.HOME} component={Home} />
        <Stack.Screen name={ROUTES.TEXT_NOTES} component={TextNotes} />
        <Stack.Screen name={ROUTES.IMAGE_NOTES} component={ImageNotes} />
        <Stack.Screen name={ROUTES.DOODLES} component={Doodles} />
        <Stack.Screen name={ROUTES.CHECKLIST} component={Checklist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
