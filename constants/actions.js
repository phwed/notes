import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../config/colors";

export const BUTTON = {
  TEXT_NOTE: "bt_text",
  PHOTO_NOTE: "bt_photo",
  CHECKLIST: "bt_list",
  DRAW_NOTES: "bt_draw",
};

export const ACTIONS = [
  {
    icon: (
      <MaterialCommunityIcons
        name="format-text"
        size={25}
        color={COLORS.TEXT_LIGHT}
      />
    ),
    name: BUTTON.TEXT_NOTE,
    color: COLORS.PRIMARY,
  },
  {
    icon: (
      <MaterialIcons name="photo-camera" size={25} color={COLORS.TEXT_LIGHT} />
    ),
    name: BUTTON.PHOTO_NOTE,
    position: 1,
    color: COLORS.PRIMARY,
  },
  {
    icon: (
      <MaterialCommunityIcons
        name="format-list-checks"
        size={25}
        color={COLORS.TEXT_LIGHT}
      />
    ),
    name: BUTTON.CHECKLIST,
    position: 3,
    color: COLORS.PRIMARY,
  },
  {
    // text: "Video",
    icon: (
      <MaterialCommunityIcons
        name="draw-pen"
        size={25}
        color={COLORS.TEXT_LIGHT}
      />
    ),
    name: BUTTON.DRAW_NOTES,
    position: 4,
    color: COLORS.PRIMARY,
  },
];
