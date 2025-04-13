/** @format */
import { IEvent } from "../interfaces";
import * as eventRepo from "../repos/eventsRepo";

const createEventService = async (event: IEvent) => {
  try {
    const newEvent = await eventRepo.createEventRepo(event);
    return {
      message: "Event created successfully",
      success: true,
      data: newEvent,
    };
  } catch (error) {
    return {
      message: "Failed to create event",
      success: false,
      data: null,
    };
  }
};
const findEventByIdService = async (id: string) => {
  try {
    const event = await eventRepo.findEventByIdRepo(id);
    if (!event) {
      return {
        message: "Event not found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Event found",
      success: true,
      data: event,
    };
  } catch (error) {
    return {
      message: "Error finding event",
      success: false,
      data: [],
    };
  }
};

const findAllEventsService = async () => {
  try {
    const events = await eventRepo.findAllEventsRepo();
    if (!events) {
      return {
        message: "No events found",
        success: false,
        data: [],
      };
    }
    return {
      message: "Events found",
      success: true,
      data: events,
    };
  } catch (error) {
    return {
      message: "Error finding events",
      success: false,
      data: [],
    };
  }
};

const findEventByDateService = async (date: string) => {
  try {
    const events = await eventRepo.findEventByDateRepo(date);
    if (!events) {
      return {
        message: "No events found for the given date",
        success: false,
        data: [],
      };
    }
    return {
      message: "Events found for the given date",
      success: true,
      data: events,
    };
  } catch (error) {
    return {
      message: "Error finding events by date",
      success: false,
      data: [],
    };
  }
};

export {
  createEventService,
  findEventByIdService,
  findAllEventsService,
  findEventByDateService,
};
