import { createSlice } from "@reduxjs/toolkit";
import { DietListDto } from "../../Api/Diet/diet.list.dto";

type InitialState = {
  selectionView: boolean;
  inputCalorie: number;
  inputMealCount: number;
  initDietList: DietListDto | null;
};

const initialState: InitialState = {
  selectionView: true,
  inputCalorie: 0,
  inputMealCount: 0,
  initDietList: null,
};

const dietReduxSlice = createSlice({
  name: "dietRedux",
  initialState,
  reducers: {
    ChangeSelectionState: (state) => {
      state.selectionView = !state.selectionView;
    },
    ChangeMealInputs: (state, payload) => {
      state.inputCalorie = payload.payload.inputCalorie;
      state.inputMealCount = payload.payload.inputMealCount;
      window.localStorage.setItem(
        "dietInput",
        JSON.stringify({
          inputCalorie: payload.payload.inputCalorie,
          inputMealCount: payload.payload.inputMealCount,
        })
      );
    },
    SetDietList: (state, payload) => {
      state.initDietList = payload.payload;
      window.localStorage.setItem("dietList", JSON.stringify(payload.payload));
    },
  },
});

export const { ChangeSelectionState, ChangeMealInputs, SetDietList } =
  dietReduxSlice.actions;

export default dietReduxSlice.reducer;
