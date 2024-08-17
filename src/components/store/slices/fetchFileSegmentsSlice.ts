// src/features/data/dataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Segment {
  start: string;
  end: string;
  text: string;
}



export  interface DataState {

  fileSegments: Segment[];
}

const initialState: DataState = {

  fileSegments: [],
};

const dataSlice = createSlice({
  name: 'segments',
  initialState,
  reducers: {

    setFileSegments: (state, action: PayloadAction<Segment[]>) => {
      state.fileSegments = action.payload;
    },
  },
});

export const {  setFileSegments } = dataSlice.actions;
export default dataSlice.reducer;
