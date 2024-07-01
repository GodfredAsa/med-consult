import express from 'express';
import { createPatient, getAllPatients, getPatientById } from '../controllers/patientController.js';


const router = express.Router();


router.route('')
.post(createPatient)
.get(getAllPatients)

router.route('/:_id')
.get(getPatientById)


// 668291405797fbf776f1d6ef


export default router;
