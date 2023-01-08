import { SafeAreaView } from "react-native";
import { View } from "react-native-ui-lib";
import { COLORS } from "../../config/colors";
import { useSettingsStore } from "../../zustand/stores/settings";

export const Container = ({ children, style, ...props }) => {
  const appTheme = useSettingsStore((state) => state.appTheme);
  return (
    <SafeAreaView
      style={[
        style,
        {
          backgroundColor: appTheme === "dark" ? COLORS.DARK : COLORS.WHITE,
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
