
import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "../reducers/uiReducer";
import { eventReducer } from "../reducers/eventReducer";


export const store = configureStore({
    reducer: {
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