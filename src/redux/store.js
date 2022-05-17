import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slice'

const store = configureStore({
    reducer:{
        Product: productReducer
    }
})

export default store