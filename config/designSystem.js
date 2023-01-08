// FoundationConfig.js
require("react-native-ui-lib/config").setConfig({ appScheme: "default" });
import {
  Colors,
  Typography,
  Spacings,
  ThemeManager,
} from "react-native-ui-lib";
import { COLORS } from "./colors";

// =============
// | RN UI Lib |
// =============

const colors = {
  primaryColor: COLORS.PRIMARY,
  secondaryColor: COLORS.SECONDARY,
  errorColor: "#E63B2E",
  successColor: "#ADC76F",
  warnColor: "#FF963C",
};

const themes = {
  light: {
    screenBG: COLORS.WHITE,
    textColor: COLORS.TEXT_DARK,

  },
  dark: {
    screenBG: COLORS.DARK,
    textColor: COLORS.TEXT_LIGHT,
  },
};

export const configureDesignSystem = async (colorMode) => {
  setColorsScheme(colorMode);
  Colors.loadColors(colors);
  Colors.loadSchemes(themes);

  Typography.loadTypographies({
    heading: {
      fontSize: 36,
      fontFamily: "extraBold",
    },
    subHeading: {
      fontSize: 28,
      fontFamily: "semiBold",
    },
    body: {
      fontSize: 18,
      fontFamily: "regular",
    },
  });

  Spacings.loadSpacings({
    page: 20,
    card: 12,
    gridGutter: 16,
  });



  ThemeManager.setComponentTheme("Card", {
    borderRadius: 10,
    backgroundColor: colorMode === "dark" ? COLORS.CARD_DARK : COLORS.CARD_LIGHT,
  });


  // with a dynamic function
  ThemeManager.setComponentTheme("Button", (props, context) => {
    // 'square' is not an original Button prop, but a custom prop that can
    // be used to create different variations of buttons in your app
    if (props.square) {
      return {
        borderRadius: 0,
      };
    }

    if (props.custom) {
      return {
          color: COLORS.TEXT_LIGHT
      }
    }

  });
};

const setColorsScheme = (mode) => {
  if (mode === "system") Colors.setScheme("default");
  else Colors.setScheme(mode);
};

// ==============
// | Navigation |
// ==============
export const getStatusBarStyle = (colorMode) => {
  switch (colorMode) {
    case "dark":
      return "light";
    case "light":
      return "dark";
    default:
      return "auto";
  }
};
