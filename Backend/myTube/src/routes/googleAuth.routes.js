import { Router } from "express";
import { googleSignIn } from "../controllers/googleAuth.controllers.js";

const router = Router();

router.route("/google-signin").post(googleSignIn);

export default router;
