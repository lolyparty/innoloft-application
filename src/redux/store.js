import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import configReducer from './configSlice'

const store = configureStore({
    reducer: {
        Product: productReducer,
        Config: configReducer
    }
})


export default store