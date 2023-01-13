import create from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { zustandStorage } from "../middlewares/zustandStorage";
import { COLORS } from "../../config/colors";
import { ACTION_TYPES } from "../../config/actionTypes";

let store = (set, get) => ({
  // initial state
  notes: [
    {
      id: 1,
      type: "text",
      createdAt: "Sun 8:40",
      title: "Text Type",
      description: "this is a text note",
      label: "label",
      color: COLORS.PRIMARY,
    },
    {
      id: 7,
      type: "text",
      createdAt: "Sun 8:40",
      title: "My Love",
      description:
        "So she said whats the problem baby, whats the problem i dont know well maybe am in love, i think about it everytime think about cant stop thinking bout it, how much longer will it take to cure this. Just to cure this cause i cant ignore it it is love.",
      label: "label",
      color: COLORS.GREEN,
    },
    {
      id: 2,
      type: "image",
      createdAt: "Sun 8:40",
      title: "Image Type",
      description:
        "This is an amazing girl with the nicest smile. She is so pretty!",
      label: "label",
      color: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/genuinestudentsportal.appspot.com/o/profilePictures%2FFred-Adu-Twum?alt=media&token=2a271dfa-ca7f-4675-b12f-a82c1c84258e",
    },
    {
      id: 3,
      type: "doodle",
      createdAt: "Sun 8:40",
      title: "Doodle Type",
      description: "This is an doodle note",
      color: "",
      doodle:
        "data:image/jpeg;base64,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",
      label: "label",
    },
    {
      id: 4,
      type: "checklist",
      createdAt: "Sun 8:40",
      title: "Checklist Type",
      description: "This is a checklist notes",
      list: [
        {
          id: 1,
          action: "Create an awesome app",
          completed: true,
        },
        {
          id: 2,
          action: "Make the awesome app even more awesome",
          completed: false,
        },
      ],
      label: "label",
      color: COLORS.HOT_PINK,
    },
  ],
  actionType: "test",

  // actions
  addNotes: () =>
    set((state) => ({
      actionType: ACTION_TYPES.ADD_NOTES,
    })),

  deleteNotes: (item) =>
    set((state) => ({
      actionType: ACTION_TYPES.DELETE_NOTES,
      notes: state.notes.filter((dataItem) => dataItem !== item),
    })),

  resetActionType: () =>
    set((state) => ({
      actionType: "",
    })),
});

store = persist(store, {
  name: "notes",
  storage: createJSONStorage(() => zustandStorage),
});

export const useNotesStore = create(store);
