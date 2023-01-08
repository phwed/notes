import { Incubator } from "react-native-ui-lib";
import { COLORS } from "../../config/colors";
import { useSettingsStore } from "../../zustand/stores/settings";
import { TextInput } from "react-native";

const { TextField } = Incubator;

export const Input = ({ placeholder, value, onChangeText, ...props }) => {
  const appTheme = useSettingsStore((state) => state.appTheme);
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...props}
      placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
      style={{
        color: appTheme === "dark" ? COLORS.TEXT_LIGHT : COLORS.TEXT_DARK,
        fontFamily: "regular",
      }}
    />
  );
};
