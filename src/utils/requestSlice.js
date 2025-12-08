import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:"request",
    initialState:null,
    reducers:{
        addRequest:(state, action)=>{
            return action.payload;
        },
        removeRequest:(state, action)=>{
            return state.filter(state=>state._id!==action.payload);
        },
        clearRequest:(state, action)=>{
            return null;
        }
    }
})

export default requestSlice.reducer;
export const {addRequest, removeRequest, clearRequest}=requestSlice.actions;