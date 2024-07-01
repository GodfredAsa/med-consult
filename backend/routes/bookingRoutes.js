import express from "express";
import { createBooking, getAllBookings } from "../controllers/bookingController.js";


const router = express.Router();

router.route('')
.get(getAllBookings)
.post(createBooking);

export default router;
