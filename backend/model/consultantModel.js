import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const consultantSchema = new mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, required: true, unique: true },
    isAuthorized: { type: String, required: true, default: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

// checking if passwords match
consultantSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// HASH PASSWORD BEFORE SAVING 
consultantSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const Consultant = mongoose.model("Consultant", consultantSchema);
export default Consultant;
