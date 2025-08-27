import dotenv from "dotenv";
dotenv.config();  // load env variables first

import express from "express";
import errorHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";

connectDb(); // now process.env.CONNECTION_STRING is defined


const app = express();

const port = process.env.PORT || 4000;

async function importRoutes() {
  try {
    app.use(express.json());
    const contactsRoutes = await import("./routes/contactsRoutes.js");
    app.use("/api/contacts", contactsRoutes.default);
    const userRoutes = await import("./routes/userRoutes.js");
    app.use("/api/users", userRoutes.default);
    app.use(errorHandler);
  } catch (error) {
    console.error("Error occurred while importing  routes:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});


app.listen(port, async () => {
  await importRoutes();
  console.log(`server is listening on port ${port}`);
});
