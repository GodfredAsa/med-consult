import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    reason: {type: String, required: true, default: "Emergency"},
    dob: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
