import jwt from "jsonwebtoken";
import { NO_TOKEN_PROVIDED, TOKEN_SECRET } from "../constants/constants.js";
import { constructResponse } from "../client/response.js";



const generateToken = (res, email) => {
  const token = jwt.sign({ email }, TOKEN_SECRET, {
    expiresIn: "3d",
  });

  return token;
};

export default generateToken;


