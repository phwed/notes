import { Incubator } from "react-native-ui-lib";
import { COLORS } from "../../config/colors";
import { useSettingsStore } from "../../zustand/stores/settings";
import { TextInput } from "react-native";
import { useTheme } from "@react-navigation/native";

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

export const TitleInput = ({
  placeholder,
  value,
  onChangeText,
  color,
  ...props
}) => {
  const { colors } = useTheme();
  const appTheme = useSettingsStore((state) => state.appTheme);

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...props}
      placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
      selectionColor={colors.text}
      style={{
        color: color
          ? color
          : appTheme === "dark"
          ? COLORS.TEXT_LIGHT
          : COLORS.TEXT_DARK,
        fontFamily: "bold",
        fontSize: 40,
      }}
    />
  );
};

export const DescriptionInput = ({
  placeholder,
  value,
  onChangeText,
  color,
  ...props
}) => {
  const { colors } = useTheme();
  const appTheme = useSettingsStore((state) => state.appTheme);

  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      {...props}
      placeholderTextColor={COLORS.PLACEHOLDER_TEXT}
      selectionColor={colors.text}
      multiline
      style={{
        color: color
          ? color
          : appTheme === "dark"
          ? COLORS.TEXT_LIGHT
          : COLORS.TEXT_DARK,
        fontFamily: "regular",
        fontSize: 18,
        paddingVertical: 3,
      }}
    />
  );
};
