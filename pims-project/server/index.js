import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import stockRoutes from "./routes/stockRoutes.js";
import salesRoutes from "./routes/salesRoutes.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

app.use("/auth", authRoutes);
app.use("/medicines", medicineRoutes);
app.use("/categories", categoryRoutes);
app.use("/stocks", stockRoutes);
app.use("/sales", salesRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Parachute backend running" });
});



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
