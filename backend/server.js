import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import authRoutes from "./routes/authRoute.js";
import leadRoutes from "./routes/leadRoute.js";
import contactRoutes from "./routes/contactRoute.js";
import noteRoutes from "./routes/noteRoute.js";
import taskRoutes from "./routes/taskRoute.js";

const app = express();

/* -------------------------- middleware -------------------- */

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

/* -------------------------- Route --------------------- */

app.get("/api/health", (req, res) =>
  res.json({ success: true, status: "ok", services: "RD CRM API" }),
);

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/tasks", taskRoutes);

/* -------------------------- Error handling (last) --------------------- */

app.use(notFound);
app.use(errorHandler);

/* -------------------------- Boot --------------------- */

const PORT = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 RD CRM API running on http://localhost:${PORT}`),
    );
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
};
start();

export default app;
