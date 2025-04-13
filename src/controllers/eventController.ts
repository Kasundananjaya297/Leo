/** @format */

import { Request, Response, NextFunction } from "express";
import {
  createEventService,
  findAllEventsService,
  findEventByDateService,
  findEventByIdService,
} from "../services/EventService";
import { IEvent } from "../interfaces";

const createEventController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const event = req.body as IEvent;
  try {
    if (!event) {
      res.status(400).json({ message: "Event details are required" });
      return;
    }
    if (!event.name || !event.date) {
      res.status(400).json({ message: "Event name and date are required" });
      return;
    }
    const savedEvent = await createEventService(event);
    if (savedEvent && savedEvent.success === false) {
      res.status(500).json({ message: savedEvent.message });
    } else {
      res.status(200).json({ success: true, event: savedEvent });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to save event" });
    console.error("Error saving event", error);
    return;
  }
};
const findEventByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventId = req.params.id;
  try {
    if (!eventId) {
      res.status(400).json({ message: "Event ID is required" });
      return;
    }
    const event = await findEventByIdService(eventId);
    if (event && event.success === false) {
      res.status(500).json({ message: event.message });
    } else {
      res.status(200).json({ success: true, event });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find event" });
    console.error("Error finding event", error);
    return;
  }
};
const findAllEventsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await findAllEventsService();
    if (events && events.success === false) {
      res.status(500).json({ message: events.message });
    } else {
      res.status(200).json({ success: true, events });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find events" });
    console.error("Error finding events", error);
    return;
  }
};
const findEventByDateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const eventDate = req.params.date;
  try {
    if (!eventDate) {
      res.status(400).json({ message: "Event date is required" });
      return;
    }
    const events = await findEventByDateService(eventDate);
    if (events && events.success === false) {
      res.status(500).json({ message: events.message });
    } else {
      res.status(200).json({ success: true, events });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find events" });
    console.error("Error finding events", error);
    return;
  }
};
export {
  createEventController,
  findEventByIdController,
  findAllEventsController,
  findEventByDateController,
};
