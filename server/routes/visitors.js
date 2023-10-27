import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getVisitor } from "../controllers/visitors.js";
const router = express.Router();

router.get("/:visitorId", verifyToken, getVisitor);
/* READ */

export default router;
