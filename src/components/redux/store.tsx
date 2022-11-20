import { configureStore } from "@reduxjs/toolkit";
import dietReduxReducer from "./DietRedux";

export default configureStore({
  reducer: {
    dietRedux: dietReduxReducer,
  },
});
