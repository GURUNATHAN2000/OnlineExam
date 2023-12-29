import { SET_NAME } from "./NameType";

export const setName = (name = "user") => {
  return {
    type: SET_NAME,
    name: name,
  };
};
