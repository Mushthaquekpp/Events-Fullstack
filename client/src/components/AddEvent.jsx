import React, { useState } from "react";
import axios from "axios";

function AddEvent(props) {
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:8000/api/events", {
        title,
        organizer,
        category,
        date,
        description,
      });
      props.getAllEvents();
    } catch (e) {
      setError("Somethig went wrong while adding the event");
    }
    handleCancel();
    setLoading(false);
  };

  const handleCancel = () => {
    setTitle("");
    setOrganizer("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div
      style={{
        width: "15vw",
        minWidth: "250px",
        maxWidth: "300px",
      }}
      className="card"
    >
      <h1>Events</h1>
      <form onSubmit={handleEventSubmit}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            id="title"
            placeholder="Enter event title"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Organizer</label>
          <input
            type="text"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
            name="organizer"
            id="organizer"
            placeholder="Enter the organizer"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id="category"
            placeholder="Enter category"
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            name="date"
            id="date"
            placeholder="Enter date"
            style={{ width: "66%" }}
            min={getCurrentDate()}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <label htmlFor="title" style={{ marginRight: "6px" }}>
            Description
          </label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            id="description"
            placeholder="Enter description"
            style={{ width: "100%", minWidth: "66%", maxHeight: "150px" }}
            required
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          <button onClick={handleCancel}>Cancel</button>
          <button className="submit-btn" disabled={loading} type="submit">
            Add Event
          </button>
        </div>
        {error}
      </form>
    </div>
  );
}

export default AddEvent;
