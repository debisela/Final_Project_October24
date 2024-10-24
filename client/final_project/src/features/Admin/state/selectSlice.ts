import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface AdminState {
    fields: string[];
    selectedFields:string[];
    status: string
  }

const initialState: AdminState = {
    fields: [],
    selectedFields:[],
    status: "",
}
//async thunk for fetch fields in table
export const fetchFields = createAsyncThunk(
    'admin/fetchFields',
    async()=>{
        try {
            const response = await axios.get(`http://localhost:3200/api/admin/fields`);
            return response.data;
        } catch (error:any) {
            console.log(error);
            
        }
    }

)

//async thunk for selecting fields
export const selectField = createAsyncThunk(
    'admin/selectField',
    async(id:number, {rejectWithValue})=>{
        try {
            console.log("id being passed", id);
            const response = await axios.post('http://localhost:3200/api/admin/tag/fields', 
            {id},
            {headers: {
                'Content-Type': 'application/json'
            }});
            console.log("response data", response.data);
            
            return response.data;
            
            
        } catch (error:any) {
            console.log("error checking in");
            
            return rejectWithValue(error.response.data)
        }
    }
)

export const selectSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers:{
        // //reset attendees
        // resetAttendees:(state)=>{
        //     state.attendees = [];
        // }
    },
    extraReducers(builder){
        builder
        .addCase(fetchFields.pending, state=>{
            state.status = "loading";
        })
        .addCase(fetchFields.fulfilled, (state, action)=>{
            state.status = "success";
            state.fields = action.payload
        })
        .addCase(fetchFields.rejected, state=>{
            state.status = "failed"
        })
        builder
        .addCase(selectField.pending, state=>{
            state.status = "loading";
        })
        .addCase(selectField.fulfilled, (state,action)=>{
            // const updatedAttendee = action.payload;
            //     const index = state.attendees.findIndex(att => att.id === updatedAttendee.id);
            //     if (index !== -1) {
            //         state.attendees[index] = { 
            //             ...state.attendees[index], 
            //             checked_in: updatedAttendee.checked_in, 
            //             check_in_time: updatedAttendee.check_in_time 
            //         };
            //     }
            state.status = "success";
        })
        .addCase(selectField.rejected, state=>{
            state.status = "failed"
        })
    }
})

export const selectFields = (state:any)=> state.fieldsReducer.fields;
export const status = (state:any)=> state.fieldsReducer.status
export const state = (state:any) => state.fieldsReducer;

// export const {resetAttendees} = searchSlice.actions
export default selectSlice.reducer;
