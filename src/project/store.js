import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Kanbas/Users/reducer";

const store = configureStore({
  reducer: {
    usersReducer,
  },
});

export default store;