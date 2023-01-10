import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authSlice } from "../slices/authSlice";
import { zustandStorage } from "../middlewares/zustandStorage";

let store = (...set) => ({
  ...authSlice(...set),
});

store = persist(store, {
  name: "auth",
  storage: createJSONStorage(() => zustandStorage),
});

export const useAuthStore = create(store);
