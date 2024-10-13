import { useSelector, useDispatch } from "react-redux";

import { selectAttendee, selectStatus } from "./selectors";

export const useAttendeeSelector = ()=>{
    return useSelector(selectAttendee)
}

export const useAttendeeStatus = ()=>{
    return useSelector(selectStatus)
}
