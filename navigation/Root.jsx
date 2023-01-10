import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";

// navigators
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

import { useAuthStore } from "../zustand/stores/auth";
import { ACTION_TYPES } from "../config/actionTypes";

const Stack = createStackNavigator();

const Root = () => {
  const actionType = useAuthStore((state) => state.actionType);

  if (actionType === ACTION_TYPES.TO_APP) {
    return <AppNavigator />;
  }

  return <AuthNavigator />;
};

export default Root;
