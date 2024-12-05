import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { combineReducers } from "redux";
import userReducer from "./feature/userSlice";

// Konfigurasi Redux Persist
const persistConfig = {
  key: "root",
  storage, // Menggunakan localStorage
};

// Gabungkan semua reducer (jika ada lebih dari satu)
const rootReducer = combineReducers({
  user: userReducer,
});

// Bungkus reducer dengan persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
