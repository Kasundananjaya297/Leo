/** @format */

import Events from "../models/eventsModels";
import { IEvent } from "../interfaces/index";

const createEventRepo = async (event: IEvent) => {
  try {
    const newEvent = new Events(event);
    await newEvent.save();
  } catch (error) {
    throw new Error("Error creating event");
  }
};

const findEventByIdRepo = async (id: string) => {
  try {
    const event = await Events.find({ id });
    if (event.length === 0) {
      return null;
    }
    return event;
  } catch (error) {
    throw new Error("Error finding event by id");
  }
};
const findAllEventsRepo = async () => {
  try {
    const events = await Events.find();
    if (events.length === 0) {
      return null;
    }
    return events;
  } catch (error) {
    throw new Error("Error finding all events");
  }
};

export { createEventRepo, findEventByIdRepo, findAllEventsRepo };
