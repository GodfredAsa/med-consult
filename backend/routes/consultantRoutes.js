import express from "express";
import { 
    getAllConsultants, 
    addConsultant,  
    authenticateConsultant, 
    getConsultantById 
} from "../controllers/consultantController.js";

const router = express.Router();



router.route('')
    .get(getAllConsultants)
    .post(addConsultant);

router.route('/:_id')
.get(getConsultantById)

router.route('/login').post(authenticateConsultant);


export default router;