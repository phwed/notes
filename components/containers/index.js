import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { View } from "react-native-ui-lib";
import { COLORS } from "../../config/colors";
import { useSettingsStore } from "../../zustand/stores/settings";

export const Container = ({ children, style, ...props }) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      style={[
        style,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export const Row = (props) => {
  <View row {...props}>
    {props.children}
  </View>;
};
