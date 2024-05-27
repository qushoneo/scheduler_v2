import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authQuery";
import { profileSlice } from "./authSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { tableApi } from "./tableQuery";

const reducers = combineReducers({
  authApi: authApi.reducer,
  tableApi: tableApi.reducer,
  profileReducer: profileSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware, tableApi.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
