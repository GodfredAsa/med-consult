import { constructResponse } from "../client/response.js";
import  { Gender }  from "../enum/gender.js";
// import asyncHandler from "../middleware/asyncHandler.js";
import Patient from "../model/patientModel.js";
import { isValidEmail } from "../utils/utils.js";


const createPatient =  ( async (req, res) => {
    const { firstName, lastName, email, reason, dob, gender } = req.body;
  
    if (!isValidEmail(email))
      return res.status(400).send(constructResponse(400, true, null, "Please provide a valid email "));
  
    if (lastName.length < 2 || firstName.length < 2)
      return res.status(400).send(constructResponse(400, true,null,"First name and last name should be more than 1 character"));
  
    if (gender !== Gender.MALE && gender !== Gender.FEMALE.toString())
      return res.status(400).send(constructResponse(400,true,null,"Invalid Gender provided. Gender is either MALE or FEMALE"));
  
    if (await Patient.findOne({ email }))
      return res.status(400).send(constructResponse(400,true,null,"Patient with the provided email already exists"));
  
    const patient = await Patient.create({ firstName, lastName, email, dob, gender});
    return res.status(200).send(constructResponse(201,false,patient,"Patient created successfully"));
  });


  // AUTHENTICATION FAILURE
 const getPatientById = (async (req, res) => {
  const patientId = req.params._id;
  const foundPatient = await Patient.findById(patientId);
  if (!foundPatient || foundPatient === null)
    return res.status(404).send(constructResponse(404, true, null, "Patient not found"));
  const patient = await Patient.findById(patientId);
  return res.status(200).json(constructResponse(200, false, patient, null));
});

// AUTHENTICATION FAILURE
const getAllPatients = (async (req, res) => {
  const patients = await Patient.find({}).select("-password -__v");
  return res.status(200).json(constructResponse(200, false, patients, null));
});

  export {
    createPatient,
    getAllPatients,
    getPatientById
  }


  