import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTION_TYPES } from "../../config/actionTypes";

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
  storage: createJSONStorage(() => AsyncStorage),
});

export const useSettingsStore = create(store);
    