import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAttendees, resetAttendees, toggleCheckIn } from "./state/searchSlice";
import { useAttendeeSelector, useAttendeeStatus } from "./state/hooks";

const SearchAttendee: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const attendees = useAttendeeSelector()
  const status = useAttendeeStatus()
  const dispatch = useDispatch()

  const handleSearch = ()=>{
    if (query.trim()===""){
      dispatch(resetAttendees())
      return
    }
    dispatch(fetchAttendees(query))
  }

  const handleCheckIn = (id:number)=>{
    dispatch(toggleCheckIn(id))
  }

  // useEffect(()=>{
  //   dispatch(fetchAttendees())
  // },[dispatch])

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
        attendees.map((attendee:any) => {
          return (
            <div key={attendee.id}>
              <h3>
                {attendee.last_name}, {attendee.first_name}
                <button onClick={() => handleCheckIn(attendee.id)}>
                  {attendee.checked_in ? "Check Out" : "Check In"}
                  </button> 
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





