import { SlideInLeftSlideOutRight } from "react-native-notificated";
import { COLORS } from "./colors";



export const NOTIFICATION = {
  isNotch: true,
  duration: 3000,
  notificationPosition: "top",
  animationConfig: SlideInLeftSlideOutRight,
  defaultStylesSettings: {
    globalConfig: {
      titleSize: 18,
      titleColor: COLORS.WHITE,
      descriptionSize: 16,
      descriptionColor: COLORS.WHITE,
      bgColor: COLORS.PRIMARY,
      borderRadius: 25,
      borderWidth: 3,
      multiline: 5,
      defaultIconType: "monochromatic",
    },
    successConfig: {
      titleSize: 18,
      titleColor: COLORS.DARK,
      descriptionSize: 16,
      descriptionColor: COLORS.TEXT_DARK,
      bgColor: COLORS.SUCCESS,
      borderRadius: 25,
      borderWidth: 3,
      multiline: 5,
      defaultIconType: "monochromatic",
    },

    infoConfig: {
      titleSize: 18,
      titleColor: COLORS.DARK,
      descriptionSize: 16,
      descriptionColor: COLORS.TEXT_DARK,
      bgColor: COLORS.INFO,
      borderRadius: 25,
      borderWidth: 3,
      multiline: 5,
      defaultIconType: "monochromatic",
    },

    warningConfig: {
      titleSize: 18,
      titleColor: COLORS.DARK,
      descriptionSize: 16,
      descriptionColor: COLORS.TEXT_DARK,
      bgColor: COLORS.WARNING,
      borderRadius: 25,
      borderWidth: 3,
      multiline: 5,
      defaultIconType: "monochromatic",
    },

    errorConfig: {
      titleSize: 18,
      titleColor: COLORS.DARK,
      descriptionSize: 16,
      descriptionColor: COLORS.TEXT_DARK,
      bgColor: COLORS.ERROR,
      borderRadius: 25,
      borderWidth: 3,
      multiline: 5,
      defaultIconType: "monochromatic",
    },
  },
};
