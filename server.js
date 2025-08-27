import dotenv from "dotenv";
dotenv.config(); // Load env variables first

import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

// Connect to database
connectDb();

const app = express();

// Middleware
app.use(express.json());

// Routes
import("./routes/contactsRoutes.js").then((module) => {
  app.use("/api/contacts", module.default);
}).catch((err) => console.error("Error loading contactsRoutes:", err));

import("./routes/userRoutes.js").then((module) => {
  app.use("/api/users", module.default);
}).catch((err) => console.error("Error loading userRoutes:", err));

// Error Handler
app.use(errorHandler);

// Basic test routes
app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Detect if running on Vercel serverless or locally
const port = process.env.PORT || 4000;
if (!process.env.VERCEL) {
  // Local server
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

export default app;
