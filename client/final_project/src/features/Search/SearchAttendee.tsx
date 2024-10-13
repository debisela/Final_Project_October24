import React, { useState, useEffect } from "react";
import axios from "axios";

interface Attendee {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
}

const SearchAttendee: React.FC = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Debounce state for delayed search requests
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Debounce Effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Waits for 500ms of inactivity before triggering search

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Fetch attendees based on the debounced query
  const fetchAttendees = async () => {
    if (!debouncedQuery) return; // Skip if query is empty
    setLoading(true);
    setError(null); // Clear previous error message

    try {
      const response = await axios.get(
        `http://localhost:3200/api/user/attendees?query=${debouncedQuery}`
      );

      if (response.status === 200) {
        setAttendees(response.data);
      } else {
        setError("No attendees found.");
        setAttendees([]);
      }
    } catch (err) {
      setError("Failed to fetch attendees.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch whenever debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.length > 0) {
      fetchAttendees();
    } else {
      setAttendees([]);
    }
  }, [debouncedQuery]);

  return (
    <div>
      <h1>Search Attendees</h1>
      <input
        type="text"
        placeholder="Enter last name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Display loading message */}
      {loading && <p>Loading...</p>}

      {/* Error message handling */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display attendees list or messages */}
      {!loading && attendees.length > 0 ? (
        <ul>
          {attendees.map((attendee) => (
            <li key={attendee.id}>
              {attendee.last_name}, {attendee.first_name} - {attendee.email}
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        debouncedQuery.length > 0 && <p>No attendees found</p>
      )}

      {/* Prompt for typing when search field is empty */}
      {debouncedQuery.length === 0 && <p>Start typing to search attendees...</p>}
    </div>
  );
};

export default SearchAttendee;
