import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


interface Attendee {
    id: number;
    first_name: string;
    last_name: string;
    title: string;
    company: string;
    email: string;
    phone: string;
    checked_in: boolean;
    check_in_time: Date;
    badge_printed: boolean;
    badge_type: string
  }

interface AttendeState{
    attendees: Attendee[];
    status: string;
}

const initialState: AttendeState = {
    attendees:[],
    status: "",
}
//async thung for search/fetch attendees
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
    async(attendee:Attendee, {rejectWithValue})=>{
        try {
            const response = await axios.post(`http://localhost:3200/api/user/attendees/${attendee.id}/checkin`, {
                checkedIn: !attendee.checked_in,
            });
            return {...attendee, checked_in:!attendee.checked_in};
        } catch (error:any) {
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
    }
})

export const attendees = (state:any)=> state.attendeeReducer.attendees;
export const status = (state:any)=> state.attendeeReducer.status
export const state = (state:any) => state.attendeeReducer;

export const {resetAttendees} = searchSlice.actions
export default searchSlice.reducer;
