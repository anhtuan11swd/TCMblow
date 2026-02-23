import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import productionReducer from "./productionRoute";

const store = configureStore({
  reducer: {
    auth: authReducer,
    production: productionReducer,
  },
});

export default store;
