import mongoose from "mongoose";
import { BookingStatus } from "../enum/status.js";

const bookingSchema = new mongoose.Schema(
  {
    consultant: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Consultant"},
    patient: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Patient"},
    purpose: {type: String, required: true, default: "Medical treatment"},
    description: { type: String, required: true },
    attendanceDate: {type: String, required: true },
    status: { type: String, required: true, default:  BookingStatus.PENDING },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
