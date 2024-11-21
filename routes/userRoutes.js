import express from "express";
import { register} from "../contollers/userControllers.js";




const router = express.Router();

router.route("/register").post(register);

export default router;