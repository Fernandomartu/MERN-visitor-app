import express from "express";
import {
  getUser,
  getUserVisitors,
  removeVisitor,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */

router.get("/:id", verifyToken, getUser);
router.get(":/id/visitors", verifyToken, getUserVisitors);

/* UPDATE */
router.patch("/:id/:visitorId", verifyToken, removeVisitor);

export default router;
