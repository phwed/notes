import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native-ui-lib";
import { COLORS } from "../../config/colors";
import { Iconsax } from "../icons/Iconsax";

const CardAction = ({ icon, label, onAction }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity row centerV marginH-s7 onPress={onAction} marginT-s5>
      <Iconsax name={icon} size={30} color={COLORS.TEXT_LIGHT} />
      <Text marginL-s4 style={{ color: COLORS.TEXT_LIGHT, fontSize: 20 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});

export default CardAction;
