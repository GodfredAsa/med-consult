// Application server
import express from "express";
import testRoutes from "./routes/testRoutes.js";
import consultantRoutes from "./routes/consultantRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorhandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.options(process.env.FRONTEND_URL, cors);

app.use("/api/v1", testRoutes);
app.use("/api/v1/consultants", consultantRoutes);
app.use("/api/v1/patients", patientRoutes)
app.use("/api/v1/booking", bookingRoutes)



const PORT = 3000;

app.use(notFound);
app.use(errorhandler);

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
