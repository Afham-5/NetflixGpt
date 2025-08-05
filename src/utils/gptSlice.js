import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    GptMovies: null,
  },
  reducers: {
    addGptMovieResult: (state, action) => {
      state.GptMovies = action.payload;
    },
  },
});
export const { addGptMovieResult } = gptSlice.actions;
export default gptSlice.reducer;
