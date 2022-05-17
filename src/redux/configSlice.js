import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    config:{}
}


const appId = process.env.APPID || 1


export const getConfig = createAsyncThunk('config',async ()=>{
        const response = await axios.get(`https://api-test.innoloft.com/configuration/${appId}/`)
        const configData = await response.data
        return configData
})

const configSlice = createSlice({
    name:'config',
    initialState,
    reducers:{
    },
    extraReducers(config){
        config
        .addCase(getConfig.pending, (state, action)=>{
            
            })
            .addCase(getConfig.fulfilled,(state, action)=>{
                state.config = action.payload
            })
            .addCase(getConfig.rejected, (state, action)=>{
                state.config = {
                    "id": 1,
                    "logo": "img.innoloft.de/logo.svg",
                    "mainColor": "#272e71",
                    "hasUserSection": true
                }
            })
    }
})

export default configSlice.reducer

