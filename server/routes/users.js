import express from "express";
import {
  getUser,
  getUserVisitors,
  removeVisitor,
  getUserReviews,
  getUserModules,
  updateModule,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/reviews", getUserReviews);
router.get("/:id", verifyToken, getUser);
router.get("/:id/visitors", verifyToken, getUserVisitors);
router.get("/:id/modules", verifyToken, getUserModules);

/*UPDATE*/
router.patch("/:id/:visitorId", verifyToken, removeVisitor);
router.patch("/module", verifyToken, updateModule);
export default router;
