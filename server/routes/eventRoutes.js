import express from "express";
import {
  addNewEvent,
  deleteEvent,
  filterEvents,
  getAllCategories,
  getAllDates,
  getAllEvents,
  searchEvent,
  updateEvent,
} from "../controllers/eventControllers.js";

const router = express.Router();

router.get("/", getAllEvents);

router.post("/", addNewEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

router.get("/search", searchEvent);

router.get("/filter", filterEvents);

router.get("/dates", getAllDates);

router.get("/categories", getAllCategories);

export default router;
