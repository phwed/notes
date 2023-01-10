import { ACTION_TYPES } from "../../config/actionTypes";
import { NAVIGATORS } from "../../config/routes";

export const authSlice = (set) => ({
  user: {},
  isLoggedIn: false,
  actionType: "",

  goToAuth: () =>
    set((state) => ({
      actionType: ACTION_TYPES.TO_AUTH,
    })),
  goToApp: () =>
    set((state) => ({
      actionType: ACTION_TYPES.TO_APP,
    })),
  resetActionTyoe: () =>
    set((state) => {
      actionType: "";
    }),

  userLogin: () => {},
  userLogout: () => {},
});
