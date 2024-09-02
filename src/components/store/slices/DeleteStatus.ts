import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  status: boolean;
}

const initialState: DataState = {
  status: false,
};

const dataSlice = createSlice({
  name: "deleteStatus",
  initialState,
  reducers: {
    setDeleteStatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const { setDeleteStatus } = dataSlice.actions;
export default dataSlice.reducer;
