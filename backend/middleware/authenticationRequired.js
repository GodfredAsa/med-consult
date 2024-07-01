
import { constructResponse } from "../client/response.js";
// import asyncHandler from "./asyncHandler.js";

// export const  protect = asyncHandler( async(req, res, next) => {

//     const authHeader = req.headers['Authorization'];
//     if (authHeader !== 'undefined' || authHeader !== null ) {
//         const token = authHeader.split(' ')[0];
//         console.log(`USER TOKEN ${authHeader}`);
//         if (token && token.length > 10 ) {
//             next();
//         } else {
//             res.status(403).json(constructResponse(401, true, null, "Unauthorized"));
//         }
//     } else {
//         res.status(403).json(constructResponse(401, true, null, "Unauthorized"));
//     }
// })



// export const validateToken =  async(req, res, next) => {
//     const authorizationHeader = req.headers.authorization;
  
//     if (!authorizationHeader) {
//       return res.status(401).json({ message: 'Unauthorized: Missing authorization header' });
//     }
  
//     const token = authorizationHeader.split(' ')[1]; // Extract token from 'Bearer token' format
  
//     if (!token) {
//       return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }
  
//     const jwt = require('jsonwebtoken');
//     const secret = 'your_secret_key'; // Same secret key used for generation
  
//     jwt.verify(token, secret, (err, decoded) => {
//       if (err) {
//         return res.status(403).json({ message: 'Forbidden: Invalid token' });
//       }
  
//       req.user = decoded; // Attach decoded user data to the request object
//       next(); // Move to the next middleware or route handler
//     });
//   }