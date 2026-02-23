import { createSlice } from "@reduxjs/toolkit";

const productionSlice = createSlice({
  initialState: {
    link: "http://localhost:1000",
  },
  name: "production",
  reducers: {
    setLink: (state, action) => {
      state.link = action.payload;
    },
  },
});

export const { setLink } = productionSlice.actions;
export default productionSlice.reducer;
