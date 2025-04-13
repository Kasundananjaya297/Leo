/** @format */

import { isValidObjectId } from "mongoose";
import { IBooking } from "../interfaces";
import * as bookingRepo from "../repos/bookingRepos";

const createBookingService = async (booking: IBooking) => {
  try {
    const newBooking = await bookingRepo.createBookingRepo(booking);
    return {
      message: "Booking created successfully",
      success: true,
      data: newBooking,
    };
  } catch (error) {
    return {
      message: "Failed to create booking",
      success: false,
      data: null,
    };
  }
};
const findBookingByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const booking = await bookingRepo.findBookingByIdRepo(id);
    if (!booking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Booking found",
      success: true,
      data: booking,
    };
  } catch (error) {
    return {
      message: "Error finding booking",
      success: false,
      data: null,
    };
  }
};
const findAllBookingsService = async () => {
  try {
    const bookings = await bookingRepo.findAllBookingsRepo();
    if (!bookings) {
      return {
        message: "No bookings found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Bookings found",
      success: true,
      data: bookings,
    };
  } catch (error) {
    return {
      message: "Error finding bookings",
      success: false,
      data: null,
    };
  }
};
const updateBookingStatusByIdService = async (id: string, status: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const updatedBooking = await bookingRepo.updateBookingStatusByIdRepo(
      id,
      status,
    );
    if (!updatedBooking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Booking updated successfully",
      success: true,
      data: updatedBooking,
    };
  } catch (error) {
    return {
      message: "Error updating booking",
      success: false,
      data: null,
    };
  }
};
const deleteBookingByIdService = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return {
        message: "Invalid booking ID",
        success: false,
        data: null,
      };
    }
    const deletedBooking = await bookingRepo.deleteBookingByIdRepo(id);
    if (!deletedBooking) {
      return {
        message: "Booking not found",
        success: false,
        data: null,
      };
    }
    return {
      message: "Booking deleted successfully",
      success: true,
      data: deletedBooking,
    };
  } catch (error) {
    return {
      message: "Error deleting booking",
      success: false,
      data: null,
    };
  }
};
export {
  createBookingService,
  findBookingByIdService,
  findAllBookingsService,
  updateBookingStatusByIdService,
  deleteBookingByIdService,
};
