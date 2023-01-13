
import { MMKV } from "react-native-mmkv";


const storage = new MMKV();

// storage.delete("notes");

// console.log(storage.getAllKeys());

export const zustandStorage = {
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    return storage.delete(name);
  },
};