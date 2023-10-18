import express from "express";
import { getUser, removeVisitor } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);

/* UPDATE */
router.patch("/:id/:visitorId", verifyToken, removeVisitor);

export default router;
