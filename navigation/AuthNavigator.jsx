import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { ROUTES } from "../config/routes";


import Intro from "../screens/Intro";
import { useSettingsStore } from "../zustand/stores/settings";
import { getNavigationTheme } from "../config/designSystem";

const Stack = createStackNavigator();

const AuthNavigator = () => {
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
        <Stack.Screen name={ROUTES.LOGIN} component={Intro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
