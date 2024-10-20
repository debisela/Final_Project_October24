import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAttendees, resetAttendees, toggleCheckIn } from "./state/searchSlice";
import { useAttendeeSelector, useAttendeeStatus } from "./state/hooks";
import {Attendee} from "./state/searchSlice"
import CheckInButton from "./CheckInButton";


const SearchAttendee: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const attendees = useAttendeeSelector()
  const status = useAttendeeStatus()
  const dispatch = useDispatch()

  const handleSearch = async()=>{
    if (query.trim()===""){
      dispatch(resetAttendees())
      return
    }
    await dispatch(fetchAttendees(query)).unwrap();

  }

  // useEffect(()=>{
  //   console.log("Updated Attendees:", attendees);
  // },[attendees])

  if (status === 'loading') return <h2>Loading...</h2>
  if (status === 'failed') return <h2>Can't get attendee...</h2>
 
    return(
        <>
        <h2>Attendees</h2>
        <div>
        <input
        type="text"
        placeholder="Enter last name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
        </div>
        {attendees.length > 0 ? (
        attendees.map((attendee:Attendee) => {
          console.log("Type of attendee.id:", typeof attendee.id);
          
          return (
            <div key={attendee.id}>
              <h3>
                {attendee.last_name}, {attendee.first_name}, {attendee.id}
                <CheckInButton attendeeId={attendee.id} checkedIn={attendee.checked_in}/>
              <button>
                Print Tag
              </button>
              </h3>
            </div>
          );
        })
      ) : (
        <p>No attendees found.</p>
      )}
        </>
    )
}
export default SearchAttendee;





