import React, { useState } from "react";
import axios from "axios";

function EventList(props) {
  const style = { width: "20%", padding: "8px", background: "#f4f4f4" };
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEdit = (event) => {
    setEditingId(event._id);
    setTitle(event.title);
    setOrganizer(event.organizer);
    setCategory(event.category);
    setDate(event.date);
    setDescription(event.description);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setError(null);
    try {
      await axios.put(`http://localhost:8000/api/events/${editingId}`, {
        title,
        organizer,
        category,
        date,
        description,
      });
      props.getAllEvents();
    } catch (e) {
      setError("Somethig went wrong while updating the event");
    } finally {
      setEditingId(null);
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`http://localhost:8000/api/events/${eventId}`);
      props.getAllEvents();
    } catch (e) {
      setError("Somethig went wrong while updating the event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "column",
      }}
    >
      <span>{error}</span>
      <div
        style={{
          display: "flex",
          width: "50vw",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
        }}
      >
        <table>
          <thead>
            <tr>
              <th style={style}>Title</th>
              <th style={style}>Organizer</th>
              <th style={style}>Category</th>
              <th style={style}>Date</th>
              <th style={style}>Description</th>
              <th style={style}></th>
            </tr>
          </thead>
          <tbody>
            {props?.allEvents?.map((event) =>
              editingId === event._id ? (
                <tr key={event._id}>
                  <td style={{ padding: "8px", width: "20%" }}>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      name="title"
                      id="title"
                      placeholder="Enter event title"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={organizer}
                      onChange={(e) => setOrganizer(e.target.value)}
                      name="organizer"
                      id="organizer"
                      placeholder="Enter the organizer"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      name="category"
                      id="category"
                      placeholder="Enter category"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      name="date"
                      id="date"
                      placeholder="Enter publication year"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      name="description"
                      id="description"
                      placeholder="Enter description"
                    />
                  </td>
                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleUpdate()}
                        className="update-btn"
                      >
                        Update
                      </button>
                      <button
                        style={{ width: "60px" }}
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={event._id}>
                  <td style={{ padding: "8px", width: "20%" }}>
                    {event.title}
                  </td>
                  <td style={{ padding: "8px" }}>{event.organizer}</td>
                  <td style={{ padding: "8px" }}>{event.category}</td>
                  <td style={{ padding: "8px" }}>{event.date}</td>
                  <td style={{ padding: "8px" }}>{event.description}</td>
                  <td style={{ padding: "8px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleEdit(event)}
                      >
                        Edit
                      </button>
                      <button
                        style={{ width: "60px" }}
                        onClick={() => handleDelete(event._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventList;
