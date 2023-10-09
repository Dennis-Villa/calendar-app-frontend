
import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "../reducers/uiReducer";
import { eventReducer } from "../reducers/eventReducer";
import { authReducer } from "../reducers/authReducer";


export const store = configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      event: eventReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        // extraArgument: myCustomApiService
      }
    })
});