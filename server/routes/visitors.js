import express from "express";
import { getUserVisitors } from "../controllers/visitors";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/visitors", verifyToken, getUserVisitors);

export default router;
