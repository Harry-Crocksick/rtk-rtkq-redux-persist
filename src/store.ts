import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { pokemonApi } from "./api/pokemon";
import { counterSlice } from "./features/counter/counterSlice";
import { usersSlice } from "./features/asyncLogics/fetchThat";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "store",
  version: 1,
  storage,
  blacklist: [pokemonApi.reducerPath],
};

const rootSlice = combineSlices(counterSlice, usersSlice);
const persistedReducerSlices = persistReducer(persistConfig, rootSlice);

export const store = configureStore({
  reducer: {
    persistedReducer: persistedReducerSlices,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
