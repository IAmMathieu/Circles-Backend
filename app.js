require("dotenv").config();
const port = process.env.PORT || 4242;
const path = require("path");
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

app.use("/images", express.static(path.resolve(__dirname, "public/images/")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  methods: "GET, HEAD, POST, PATCH, DELETE, OPTIONS",
  credentials: false,
  preflightContinue: false,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

const io = socketio(server, {
  cors: corsOptions,
});

const socketServ = require("./app/services/sockerServer")(io);

app.use(cors(corsOptions));
app.use(router);
