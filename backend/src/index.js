const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const connectDB = require("./lib/db");
const cookiePaser = require("cookie-parser");
const cors = require("cors");
const { app, server } = require("./lib/socket");
const path = require("path");

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookiePaser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

server.listen(process.env.PORT, () => {
  console.log("Server is running on port PORT:", process.env.PORT);
  connectDB();
});
