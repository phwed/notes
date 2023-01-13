import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  TouchableOpacity,
  Text,
  Spacings,
  BorderRadiuses,
} from "react-native-ui-lib";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export const FooterActions = ({ onPress, color }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          borderColor: color,
        },
      ]}
      onPress={onPress}
    >
      <MaterialIcons name="more-horiz" size={20} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 25,
    bottom: 35,
    padding: Spacings.s1,
    borderRadius: BorderRadiuses.br100,
    borderWidth: 2,
  },
});
