import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "./components/EventList";
import AddEvent from "./components/AddEvent";
import Dropdown from "./components/DropDown";

const App = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [genreOptions, setGenreOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const getAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/events");
      setAllEvents(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the events");
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/events/categories"
      );
      setGenreOptions(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the categories");
    }
  };

  const getAllDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/events/dates"
      );
      setYearOptions(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the dates");
    }
  };

  const getFilteredEvents = async (
    selectedYear = selectedYear,
    selectedGenre = selectedGenre
  ) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/filter?year=${selectedYear}&categories=${selectedGenre}`
      );
      setAllEvents(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the dates");
    }
  };

  const handleFilterGenre = async (option) => {
    setSelectedGenre(option);
    getFilteredEvents(selectedYear, option);
  };

  const handleFilterYear = async (option) => {
    setSelectedYear(option);
    getFilteredEvents(option);
  };

  useEffect(() => {
    getAllEvents();
    getAllCategories();
    getAllDates();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/events/search?query=${search}`
      );
      setAllEvents(response.data);
    } catch (e) {
      console.log(e);
      setError("Somethig went wrong while getting the events");
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <AddEvent getAllEvents={getAllEvents} />
      <div className="card">
        <h3>Event List</h3>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "4px",
            }}
          >
            <label htmlFor="search">Search </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              id="search"
              placeholder="Enter event title"
            />
            <button
              className="search-btn"
              style={{ marginLeft: "8px" }}
              onClick={handleSearch}
            >
              Search
            </button>
            {search ? (
              <button
                style={{ marginLeft: "8px" }}
                onClick={() => {
                  setSearch("");
                  getAllEvents();
                }}
              >
                Cancel
              </button>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
            }}
          >
            <div>
              <label htmlFor="search">Filter by categories </label>
              <Dropdown onSelect={handleFilterGenre} options={genreOptions} />
            </div>
            <div>
              <label htmlFor="search">Filter by Year </label>
              <Dropdown onSelect={handleFilterYear} options={yearOptions} />
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <EventList allEvents={allEvents} getAllEvents={getAllEvents} />
      )}
    </div>
  );
};

export default App;
