import { SET_NAME } from "./NameType";

const initialState = {
  name: 'USER',
};


export const NameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NAME: {
      return {
        ...state,
        name: action.name,
      };
    }
    default:
      return state;
  }
};
