import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {toggleCheckIn } from "./state/searchSlice";

interface CheckInToggleProps {
    attendeeId: number;
    checkedIn: boolean;
  }

  const CheckInButton: React.FC<CheckInToggleProps> = ({attendeeId, checkedIn})=>{
    const dispatch = useDispatch()

    const handleCheckIn = async ()=>{
        // console.log("id checkin", attendeeId);
        
        try {
          await dispatch(toggleCheckIn(attendeeId)).unwrap();
        } catch (error) {
          console.log(error);
        }
      }

      return(
        <>
        <button onClick={handleCheckIn}>
                  {checkedIn ? "Check Out" : "Check In again"}
                  </button>
        </>
    )
  }
  export default CheckInButton;