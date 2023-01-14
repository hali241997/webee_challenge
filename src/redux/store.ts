import { Action, configureStore } from "@reduxjs/toolkit";
import createSensitiveStorage from "redux-persist-sensitive-storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const storage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs",
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = (state: unknown, action: Action<any>) => {
  state = undefined;
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([]),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
