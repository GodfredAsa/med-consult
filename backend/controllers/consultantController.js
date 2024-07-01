import { constructResponse } from "../client/response.js";
import { Gender } from "../enum/gender.js";
import Consultant from "../model/consultantModel.js";
import { isValidEmail, isValidPassword } from "../utils/utils.js";
import generateToken from '../utils/generateToken.js';
import  jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from "../constants/constants.js";


const addConsultant =  async (req, res) => {
  console.log("===================");
  const { firstName, lastName, email, password, dob, gender } = req.body;

  if (!isValidEmail(email))
    return res.status(400).send(constructResponse(400, true, null, "Please provide a valid email "));

  if (lastName.length < 2 || firstName.length < 2)
    return res.status(400).send(constructResponse(400, true,null,"First name and last name should be more than 1 character"));

  if (!isValidPassword(password) || password.length < 4)
    return res.status(400).send(constructResponse(400,true,null,"Password should be more than 4 characters with at least one special character"));

  if (gender !== Gender.MALE && gender !== Gender.FEMALE.toString())
    return res.status(400).send(constructResponse(400,true,null,"Invalid Gender provided. Gender is either MALE or FEMALE"));

  if (await Consultant.findOne({ email }))
    return res.status(400).send(constructResponse(400,true,null,"Consultant with the provided email already exists"));

  const consultant = await Consultant.create({ firstName, lastName, email, password, dob, gender});
  const retUserJson = { firstName, lastName, email, consultantId: consultant._id, dob, gender, isAuthorized: consultant.isAuthorized};
  return res.status(200).send(constructResponse(201,false,retUserJson,"Consultant created successfully"));
};

const authenticateConsultant =  (async (req, res) => {

  const { email, password } = req.body;
  const foundConsultant = await Consultant.findOne({ email });
  if (foundConsultant === null)
    return res
      .status(404)
      .send(constructResponse(404, true, null, "Invalid credentials"));
  if (foundConsultant && (await foundConsultant.matchPassword(password))) {
    const token = generateToken(res, foundConsultant.email);
    const retJsn = {
      email: foundConsultant.email,
      dateOfBirth: foundConsultant.dob,
      firstName: foundConsultant.firstName,
      lastName: foundConsultant.lastName,
      consultantId: foundConsultant._id,
      token,
    };
    return res.status(200).send(constructResponse(200, false, retJsn, "Login Successful"));
  } else {
    return res.status(404).send(constructResponse(404, true, null, "Invalid credentials"));
  }
});

// AUTHENTICATION FAILURE
 const getConsultantById =  (async (req, res) => {
  const consultantId = req.params._id;
  const foundConsultant = await Consultant.findById(consultantId);
  if (!foundConsultant || foundConsultant === null)
    return res.status(404).send(constructResponse(404, true, null, "Consultant not found"));
  const consultant = await Consultant.findById(consultantId).select(
    "-password -__v"
  );
  return res.status(200).json(constructResponse(200, false, consultant, null));
});

// AUTHENTICATION FAILURE
const getAllConsultants = (async (req, res) => {
  const consultants = await Consultant.find({}).select("-password -__v");
  return res.status(200).json(constructResponse(200, false, consultants, null));
});


export {
  addConsultant,
  authenticateConsultant,
  getAllConsultants,
  getConsultantById
};


// const jwt = require('jsonwebtoken');

// const token = 'your_jwt_token_here'; // Replace with the actual token
// const secret = 'your_secret_key';  // Same secret key used for generation

// try {
//   const decoded = jwt.verify(token, secret);
//   console.log('Decoded payload:', decoded);
// } catch(err) {
//   console.error('Invalid token:', err.message);
// }