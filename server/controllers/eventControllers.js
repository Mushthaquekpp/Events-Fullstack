import Event from "../models/events.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const addNewEvent = async (req, res) => {
  const event = new Event({
    title: req.body.title,
    organizer: req.body.organizer,
    category: req.body.category,
    date: req.body.date,
    description: req.body.description,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "event deleted" });
  } catch (error) {}
};

export const searchEvent = async (req, res) => {
  const query = req.query.query;
  try {
    const events = await Event.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { organizer: { $regex: query, $options: "i" } },
      ],
    });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterEvents = async (req, res) => {
  const category = req.query.category;
  const date = req.query.date;
  try {
    const filter = {};
    if (category) filter.category = category;
    if (date) filter.date = date;
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllDates = async (req, res) => {
  try {
    const dates = await Event.find().distinct("date");
    res.json(dates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Event.find().distinct("category");
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
