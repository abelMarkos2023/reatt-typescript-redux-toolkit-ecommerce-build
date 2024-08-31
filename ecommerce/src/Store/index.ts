import { combineReducers, configureStore } from "@reduxjs/toolkit";
import Categories from "./Categories/CategoriesSlice";
import Products from "./Products/ProductsSlice"
import Cart from './Cart/CartSlice'
import Wishlist from "./Wishlist/WishListSlice";
import Auth from './Auth/AuthSlice'
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import OrderSlice from "./Order/OrderSlice";




const rootPersistorConfig = {
    key:"Root",
    storage,
    whitelist:['auth','cart']
}

const authPersistorConfig = {
    key:"auth",
    storage,
    whitelist:['accessToken','user']
}

const cartPersistorConfig = {
    key:"Cart",
    storage,
    whitelist:['items']
}
const rootReducer = combineReducers({
        Categories,
        Auth : persistReducer(authPersistorConfig,Auth),
        Products,
        Wishlist,
        Cart : persistReducer(cartPersistorConfig,Cart),
        Order:OrderSlice
})

const storePersistor = persistReducer(rootPersistorConfig,rootReducer)


 const store = configureStore({
    reducer:storePersistor,
    middleware : getDefaultMiddleware => {
      return  getDefaultMiddleware({
            serializableCheck:{
                ignoreActions:[FLUSH,REGISTER,REHYDRATE,PURGE,PAUSE,PERSIST]
            }
        })
    }
})

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export  {store,persistor};