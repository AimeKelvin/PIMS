import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "PIMS backend is running",
  });
});

app.use("/api", authRoutes);
app.use("/api", medicineRoutes);
app.use("/api", categoryRoutes);
app.use("/api", stockRoutes);
app.use("/api", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});