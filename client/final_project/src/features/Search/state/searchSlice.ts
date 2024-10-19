import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export interface Attendee {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    checked_in: boolean;
    check_in_time: Date | null;
    badge_printed: boolean;
    badge_type: string
  }

interface AttendeeState{
    attendees: Attendee[];
    status: string;
}

const initialState: AttendeeState = {
    attendees:[],
    status: "",
}
//async thunk for search/fetch attendees
export const fetchAttendees = createAsyncThunk(
    'attendees/fetchAttendees',
    async(query:string, {rejectWithValue})=>{
        try {
            const response = await axios.get(`http://localhost:3200/api/user/attendees?query=${query}`);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data)
        }
    }

)

//asyn thunk for check in attendee
export const toggleCheckIn = createAsyncThunk(
    'attendees/toggleCheckIn',
    async(id:number, {rejectWithValue})=>{
        try {
            console.log("id being passed", id);
            const response = await axios.post('http://localhost:3200/api/user/attendees/checkin', 
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

export const searchSlice = createSlice({
    name: "attendee",
    initialState: initialState,
    reducers:{
        //reset attendees
        resetAttendees:(state)=>{
            state.attendees = [];
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchAttendees.pending, state=>{
            state.status = "loading";
        })
        .addCase(fetchAttendees.fulfilled, (state, action)=>{
            state.status = "success";
            state.attendees = action.payload
        })
        .addCase(fetchAttendees.rejected, state=>{
            state.status = "failed"
        })
        builder
        .addCase(toggleCheckIn.pending, state=>{
            state.status = "loading";
        })
        .addCase(toggleCheckIn.fulfilled, (state,action)=>{
            const updatedAttendee = action.payload;
                const index = state.attendees.findIndex(att => att.id === updatedAttendee.id);
                if (index !== -1) {
                    state.attendees[index] = { 
                        ...state.attendees[index], 
                        checked_in: updatedAttendee.checked_in, 
                        check_in_time: updatedAttendee.check_in_time 
                    };
                }
            state.status = "success";
        })
        .addCase(toggleCheckIn.rejected, state=>{
            state.status = "failed"
        })
    }
})

export const attendees = (state:any)=> state.attendeeReducer.attendees;
export const status = (state:any)=> state.attendeeReducer.status
export const state = (state:any) => state.attendeeReducer;

export const {resetAttendees} = searchSlice.actions
export default searchSlice.reducer;
