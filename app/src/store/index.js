import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, legacy_createStore as createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import { AuthReducer } from "./reducer/auth"

const persistConfig = {
    key: "medassistPerson",
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    auth: AuthReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)