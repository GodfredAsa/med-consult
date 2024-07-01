import { constructResponse } from "../client/response.js";
// import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../model/bookingModel.js";
import Consultant from "../model/consultantModel.js";
import Patient from "../model/patientModel.js";
import { isValidateDate } from "../utils/utils.js";

const createBooking = (async (req, res) =>{
    const {consultantId, patientId, purpose, description, attendanceDate} = req.body;
    const consultant = await Consultant.findById(consultantId);
    const patient = await Patient.findById(patientId);

    if(consultant === null || !consultant) 
        return res.status(404).send(constructResponse(404, true, null, "Consultant not found"));
    if(patient === null || !patient) 
        return res.status(404).send(constructResponse(404, true, null, "Patient not found"));

    if(isValidateDate(attendanceDate))
        return res.status(404).send(constructResponse(404, true, null, "Invalid Date format yyyy-mm-dd"));

    if(purpose.trim() ==="" || description.trim() === "")
    return res.status(404).send(constructResponse(404, true, null, "Provide reason and purpose for this booking"));

    const booking = await Booking.create({consultant, patient, purpose, description, attendanceDate})
    return res.status(201).send(booking)
});


const getAllBookings = (async (req, res) => {
   const bookings =  await Booking.find({}).select("-__v -updatedAt");
   res.status(200).send(bookings)
})

export {
    createBooking,
    getAllBookings
}