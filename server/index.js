import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import visitorRoutes from "./routes/visitors.js";
import { register } from "./controllers/auth.js";
import User from "./models/user.js";
import Visitor from "./models/Visitor.js";
import { users, visitors } from "./data/inject.js";
import {
  createVisitor,
  updateVisitor,
  validateVisitor,
} from "./controllers/visitors.js";
import { verifyToken } from "./middleware/auth.js";

/* CONFIGURATIONS */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/visitors", verifyToken, createVisitor);

app.patch("/visitors/:id", verifyToken, updateVisitor);
app.post("/visitors/validate", verifyToken, validateVisitor);
/* ROUTES */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/visitors", visitorRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    // User.insertMany(users);
    // Visitor.insertMany(visitors);
  })
  .catch((error) => console.log(`${error} did not connect`));
