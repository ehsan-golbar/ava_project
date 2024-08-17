// src/features/data/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DataState {
  resultLanguage: string;
}

const initialState: DataState = {
  resultLanguage: 'fa',
};

const dataSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setResultLanguage: (state, action: PayloadAction<string>) => {
      state.resultLanguage = action.payload;
    },
  },
});

export const { setResultLanguage } = dataSlice.actions;
export default dataSlice.reducer;
