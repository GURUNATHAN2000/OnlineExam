import { createStore } from "redux";
import { NameReducer } from "./redux/NameReducer";

export const store = createStore(NameReducer);
