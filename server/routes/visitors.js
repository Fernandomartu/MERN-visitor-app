import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getVisitor, validateVisitor } from "../controllers/visitors.js";
const router = express.Router();

/* READ */
router.get("/:visitorId", verifyToken, getVisitor);

/* VALIDATE */

export default router;
