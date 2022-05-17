require("dotenv").config();
const port = process.env.PORT || 4242;
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app).listen(
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  })
);
const cors = require("cors");
const router = require("./app/router/router");

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    "*",
    "http://91.86.45.85",
    "http://176.159.219.162:3000",
    "https://apocircles.surge.sh",
  ],
  methods: ["GET", "HEAD", "POST", "PATCH", "DELETE", "OPTIONS"],
  credentials: true,
  preflightContinue: false,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

const io = socketio(server, corsOptions);
const socketServ = require("./app/services/sockerServer")(io);

app.use(cors(corsOptions));
app.use(router);
