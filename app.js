require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router/router");
const port = process.env.PORT || 4242;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cross Origin middleware -- à adapter
// app.use(function (_, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: "*",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    preflightContinue: false,
  })
);
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
