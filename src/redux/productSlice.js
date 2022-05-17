import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    productInfo:{

    },
    loading: false,
    error: false
}

export const getProductInfo = createAsyncThunk('product/getProductInfo', async ()=>{
    const response = await axios.get('https://api-test.innoloft.com/product/6781/')
    const productData = await response.data
    return productData
})


const productSlice = createSlice({
    name:'Product',
    initialState,
    reducers:{
        EditedDesc : (state,action)=>{
                state.productInfo.description = action.payload.desc
                state.productInfo.categories = action.payload.categories
                state.productInfo.businessModels = action.payload.businessModels
        },
        editedCategories:(state, action)=>{
            state.productInfo.categories.push(action.payload)
        },
        editedBusinessModels:(state, action)=>{
            state.productInfo.businessModels.push(action.payload)
        },
        editedTrl:(state, action)=>{
            state.productInfo.trl = action.payload
        }
    },
    extraReducers(product){
        product
            .addCase(getProductInfo.pending, (state, action)=>{
            state.loading = true;
            })
            .addCase(getProductInfo.fulfilled,(state, action)=>{
                state.loading = false
                state.productInfo = action.payload
                state.productInfo.description = state.productInfo.description.replace(/"/g, "'")
            })
            .addCase(getProductInfo.rejected, (state, action)=>{
                state.loading = false;
                state.error = true;
            })
    }
})

export default productSlice.reducer

export const {EditedDesc, editedCategories, editedBusinessModels, editedTrl} = productSlice.actions