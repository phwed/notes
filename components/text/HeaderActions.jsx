import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  TouchableOpacity,
  Text,
  Spacings,
  BorderRadiuses,
} from "react-native-ui-lib";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";

export const HeaderActions = ({ onBack, onUndo, onRedo, onSave, color }) => {
  const { colors } = useTheme();

  const IconButton = ({ name, onPress, spacer, color }) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {
            borderColor: color,
            marginRight: spacer && 15,
          },
        ]}
        onPress={onPress}
      >
        <MaterialCommunityIcons name={name} size={20} color={color} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <IconButton name="chevron-left" onPress={onBack} color={color} />

      <View style={styles.groupRow}>
        <IconButton name="undo-variant" spacer onPress={onUndo} color={color} />
        <IconButton name="redo-variant" spacer onPress={onRedo} color={color} />
        <IconButton name="check" onPress={onSave} color={color} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacings.s4,
    paddingTop: Spacings.s2
  },

  groupRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  button: {
    padding: Spacings.s1,
    borderRadius: BorderRadiuses.br100,
    borderWidth: 2,
  },
});
