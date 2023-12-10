import { atom } from "recoil";

export const majorState = atom({
  key: "majorState", // unique ID (with respect to other atoms/selectors)
  default: "Informatika", // default value (aka initial value)
});
