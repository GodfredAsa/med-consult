import express from "express";

import { helloWordController } from '../controllers/testController.js'


const router = express.Router();


router.route('').get(helloWordController);

export default router;