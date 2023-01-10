import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";
import { ACTION_TYPES } from "../../config/actionTypes";
import { zustandStorage } from "../middlewares/zustandStorage";

let store = (set, get) => ({
  // initial state
  appTheme: "light",
  actionType: "",

  // actions
  changeTheme: () =>
    set((state) => ({
      appTheme: state.appTheme === "light" ? "dark" : "light",
      actionType: ACTION_TYPES.CHANGE_THEME,
    })),

  resetActionType: () =>
    set((state) => ({
      actionType: "",
    })),
});

store = persist(store, {
  name: "note_settings",
  storage: createJSONStorage(() => zustandStorage),
});

export const useSettingsStore = create(store);
