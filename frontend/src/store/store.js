import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import userSlice from './userSlice';

const customStorage = {
    getItem:(key) => {
      return Promise.resolve(window.localStorage.getItem(key));
    },
    setItem:(key, value) => {
      window.localStorage.setItem(key, value);
      return Promise.resolve();
    },
    removeItem: (key) => {
      window.localStorage.removeItem(key);
      return Promise.resolve();
    }
}

const persisConfig = {
  key: "root",
  storage: customStorage,
  whitelist: ["user"]
};

const rootReducer = combineReducers({
  user: userSlice
})

const persistedReducer = persistReducer(
persisConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  
})

export const persistor = persistStore(store);