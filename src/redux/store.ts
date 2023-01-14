import {
  AnyAction,
  CombinedState,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
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
import createSensitiveStorage from "redux-persist-sensitive-storage";
import categoriesReducer from "./categories/slice";
import { CategoriesState } from "./categories/types";
import inventoriesReducer from "./inventories/slice";
import { InventoriesState } from "./inventories/types";

const storage = createSensitiveStorage({
  keychainService: "myKeychain",
  sharedPreferencesName: "mySharedPrefs",
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducers = combineReducers({
  categories: categoriesReducer,
  inventories: inventoriesReducer,
});

const rootReducer = (
  state:
    | CombinedState<{
        categories: CategoriesState;
        inventories: InventoriesState;
      }>
    | undefined,
  action: AnyAction,
) => {
  if (action.type === "clear") {
    state = undefined;
  }
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
