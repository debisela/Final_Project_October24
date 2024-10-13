import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { query } from "express";

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
    loading: boolean;
    message: string;
}

const initialState: AttendeState = {
    attendees:[],
    loading: false,
    message: '',
}
//async thung for search/fetch attendees
export const fetchAttendees = createAsyncThunk(
    'attendees/fetchAttendees',
    async(query:string)=>{
        try {
            const response = await axios.get(`http://localhost:3200/api/user/attendees?query=${query}`);
            return response.data;
        } catch (error) {
            console.log(error);
            return ("failed to fetch attendees")
            
            
        }
    }

)

//asyn thunk for check in attendee
export const toggleCheckIn = createAsyncThunk(
    'attendees/toggleCheckIn',
    async(attendee:Attendee)=>{
        try {
            const response = await axios.post(`http://localhost:3200/api/user/attendees/${attendee.id}/checkin`);
            return response.data;
        } catch (error) {
            console.log(error);
            return ("failed to fetch attendees")
            
            
        }
    }

)

export const searchSlice = createSlice({
    name: "attendee",
    initialState: initialState,
    reducers:{
        //search attendee
        searchAttendee:(state, action)=>{

        }
    }
})